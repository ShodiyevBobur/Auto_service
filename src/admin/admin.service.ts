import { Injectable, NotFoundException, ConflictException, BadRequestException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { LoginAdminDto } from './dto/login_admin_dto';
import { v4 } from 'uuid';
import { MailService } from 'src/mail/mail.service';



@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,

  ){}
  async getTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  async Adminregistration(createAdminDto: CreateAdminDto, res: Response) {
    const admin = await this.adminRepository.findOne({
      where: {
        email: createAdminDto.email,
      },
    });
    if (admin) {
      throw new BadRequestException('This login is already registered');
    }
    const password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminRepository.create({
      ...createAdminDto,
      password,

    });
    await this.adminRepository.save(newAdmin)
    const tokens = await this.getTokens(newAdmin);

    // console.log(`admin's tokens`, tokens);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const activation_link = v4();

    const admin1 = await this.adminRepository.findOne({where:{id: newAdmin.id}})
    if (!admin1) {
      throw new NotFoundException('Admin not found');
    }

    const updatedAdmin1 = Object.assign(admin1, hashed_refresh_token,activation_link);
    const updateAdmin = await this.adminRepository.save(updatedAdmin1)
    // console.log(tokens );
    updateAdmin.activation_link = activation_link
    updateAdmin.hashed_refresh_token = hashed_refresh_token
    const s = await this.adminRepository.save(updateAdmin)
    

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  
    try {
      // console.log(s);
      
      await this.mailService.sendMail(s);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Xatni yuborishda xatolik');
    }

    const response = {
      message: 'admin registered ',
      admin: updateAdmin['id'],
      tokens,
    };
    return response;
  }


  //// ================================================================= ////////////////

  async login(loginUserDto: LoginAdminDto, res: Response) {
    const { email, password } = loginUserDto;
    const admin = await this.adminRepository.findOne({ where: { email } });

    if (!admin) {
      throw new BadRequestException('admin not found');
    }
    if (!admin.is_active) {
      throw new BadRequestException('admin it not activated');
    }
    const isMatchPass = await bcrypt.compare(password, admin.password);
    if (!isMatchPass) {
      throw new BadRequestException('Password do not  match');
    }
    const tokens = await this.getTokens(admin);
    // console.log('tokens ', tokens);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);


    const admin1 = await this.adminRepository.findOne({where:{id: admin.id}})
    if (!admin1) {
      throw new NotFoundException('Admin not found');
    }
    const updatedAdmin1 = Object.assign(admin1, hashed_refresh_token);
    updatedAdmin1.hashed_refresh_token = hashed_refresh_token
    const updateAdmin = await this.adminRepository.save(updatedAdmin1)




    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'Admin logged in',
      admin: updateAdmin["id"],
      tokens,
    };
    return response;
  }


  async refreshToken(adminId: number, refresh_token: string, res: Response) {
    const decodedToken = this.jwtService.decode(refresh_token);
    console.log( decodedToken['id']);
    // console.log( adminId);
    
    if (adminId !== decodedToken['id']) {
      throw new BadRequestException('Admin not verified');
    }
    const admin = await this.adminRepository.findOne({ where: { id: adminId } });
    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException('Admin not found');
    }
    // console.log(refresh_token,"/n",admin.hashed_refresh_token);

    
    const isMatch = await bcrypt.compare(
      refresh_token,
      admin.hashed_refresh_token,
    );
    // console.log(isMatch);
    if (!isMatch) {
      throw new ForbiddenException('Admin not verified');
    }
    const tokens = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

     const admin1 = await this.adminRepository.findOne({where:{id: admin.id}})
    if (!admin1) {
      throw new NotFoundException('Admin not found');
    }
    
    const updatedAdmin1 = Object.assign(admin1, hashed_refresh_token);
    const updateAdmin = await this.adminRepository.save(updatedAdmin1)
    //  console.log(tokens );
    
     updateAdmin.hashed_refresh_token = hashed_refresh_token
     await this.adminRepository.save(updateAdmin)

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'admin registered ',
      admin: updateAdmin["id"],
      tokens,
    };
    return response;
  }

  // =====================================================================================

  async logout(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!adminData) {
      throw new BadRequestException('Admin not verified');
    }

    const admin1 = await this.adminRepository.findOne({where:{id: adminData.id}})
    if (!admin1) {
      throw new NotFoundException('Admin not found');
    }
    admin1.hashed_refresh_token = null

    await this.adminRepository.save(admin1)



    res.clearCookie('refresh_token');
    const response = {
      message: 'Admin logged out successfully',
      admin: admin1["id"],
    };
    return response;
  }



  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const { email } = createAdminDto;

    // Check if admin with the provided email already exists
    const existingAdmin = await this.adminRepository.findOne({ where:{email} });
    if (existingAdmin) {
      throw new ConflictException('Admin with this email already exists');
    }

    // Create and save the new admin
    const newAdmin = this.adminRepository.create(createAdminDto);
    return await this.adminRepository.save(newAdmin);
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminRepository.find();
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOne({where:{id}});
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.findOne(id);
    const updatedAdmin = Object.assign(admin, updateAdminDto);
    return await this.adminRepository.save(updatedAdmin);
  }

  async remove(id: number): Promise<void> {
    const admin = await this.findOne(id);
    await this.adminRepository.remove(admin);
  }


  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link is required');
    }

    const admin1 = await this.adminRepository.findOne({ where: { activation_link: link } });
    if (!admin1) {
      throw new NotFoundException('User not found');
    }

    admin1.is_active = true;
    const updatedUser = await this.adminRepository.save(admin1);
    if (!updatedUser) {
      throw new InternalServerErrorException('Failed to activate user');
    }

    const response = {
      message: 'User activated successfully',
      user: updatedUser.is_active,
    };

    return response;
}

}