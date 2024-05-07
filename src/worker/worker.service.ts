import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { Worker } from './entities/worker.entity';
import { JwtService } from '@nestjs/jwt';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { LoginWorkerDto } from './dto/login_worker_dto';



@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(worker: Worker) {
    const payload = {
      id: worker.id,
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


  async WorkerRegistration(createWorkerDto: CreateWorkerDto, res: Response) {
    const worker = await this.workerRepository.findOne({
      where: {
        email: createWorkerDto.email,
      },
    });
    if (worker) {
      throw new BadRequestException('This login is already registered');
    }
    const password = await bcrypt.hash(createWorkerDto.password, 7);
    const newWorker = await this.workerRepository.create({
      ...createWorkerDto,
      password,

    });
    await this.workerRepository.save(newWorker)
    const tokens = await this.getTokens(newWorker);

    // console.log(`admin's tokens`, tokens);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const worker1 = await this.workerRepository.findOne({where:{id: newWorker.id}})
    if (!worker1) {
      throw new NotFoundException('Worker not found');
    }

    const updatedWorker1 = Object.assign(worker1, hashed_refresh_token);
    const updateWorker = await this.workerRepository.save(updatedWorker1)
    // console.log(tokens );
    updateWorker.hashed_refresh_token = hashed_refresh_token
    const s = await this.workerRepository.save(updateWorker)
    

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  
    const response = {
      message: 'worker registered ',
      admin: updateWorker['id'],
      tokens,
    };
    return response;
  }


  async login(loginWorkerDto: LoginWorkerDto, res: Response) {
    const { email, password } = loginWorkerDto;
    const worker = await this.workerRepository.findOne({ where: { email } });

    if (!worker) {
      throw new BadRequestException('Worker not found');
    }
    const isMatchPass = await bcrypt.compare(password, worker.password);
    if (!isMatchPass) {
      throw new BadRequestException('Password do not  match');
    }
    const tokens = await this.getTokens(worker);
    // console.log('tokens ', tokens);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);


    const worker1 = await this.workerRepository.findOne({where:{id: worker.id}})
    if (!worker1) {
      throw new NotFoundException('Worker not found');
    }
    const updatedWorker1 = Object.assign(worker1, hashed_refresh_token);
    updatedWorker1.hashed_refresh_token = hashed_refresh_token
    const updateWorker = await this.workerRepository.save(updatedWorker1)




    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'Worker logged in',
      worker: updateWorker["id"],
      tokens,
    };
    return response;
  }


  async refreshToken(workerId: number, refresh_token: string, res: Response) {
    const decodedToken = this.jwtService.decode(refresh_token);
    console.log( decodedToken['id']);
    // console.log( adminId);
    
    if (workerId !== decodedToken['id']) {
      throw new BadRequestException('Worker not verified');
    }
    const worker = await this.workerRepository.findOne({ where: { id: workerId } });
    if (! worker|| !worker.hashed_refresh_token) {
      throw new BadRequestException('Worker not found');
    }
    // console.log(refresh_token,"/n",admin.hashed_refresh_token);

    
    const isMatch = await bcrypt.compare(
      refresh_token,
      worker.hashed_refresh_token,
    );
    // console.log(isMatch);
    if (!isMatch) {
      throw new ForbiddenException('Worker not verified');
    }
    const tokens = await this.getTokens(worker);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

     const worker1 = await this.workerRepository.findOne({where:{id: worker.id}})
    if (!worker1) {
      throw new NotFoundException('Worker not found');
    }
    
    const updatedWorker1 = Object.assign(worker1, hashed_refresh_token);
    const updateWorker = await this.workerRepository.save(updatedWorker1)
    //  console.log(tokens );
    
     updateWorker.hashed_refresh_token = hashed_refresh_token
     await this.workerRepository.save(updateWorker)

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Worker registered ',
      worker: updateWorker["id"],
      tokens,
    };
    return response;
  }

  // =====================================================================================

  async logout(refreshToken: string, res: Response) {
    const workerData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!workerData) {
      throw new BadRequestException('Worker not verified');
    }

    const worker1 = await this.workerRepository.findOne({where:{id: workerData.id}})
    if (!worker1) {
      throw new NotFoundException('Worker not found');
    }
    worker1.hashed_refresh_token = null

    await this.workerRepository.save(worker1)



    res.clearCookie('refresh_token');
    const response = {
      message: 'Worker logged out successfully',
      worker: worker1["id"],
    };
    return response;
  }






  async create(createWorkerDto: CreateWorkerDto): Promise<Worker> {
    const worker = this.workerRepository.create(createWorkerDto);
    return this.workerRepository.save(worker);
  }

  async findAll(): Promise<Worker[]> {
    return this.workerRepository.find();
  }

  async findOne(id: number): Promise<Worker> {
    const worker = await this.workerRepository.findOne({where:{id}});
    if (!worker) {
      throw new NotFoundException('Worker not found');
    }
    return worker;
  }

  async update(id: number, updateWorkerDto: UpdateWorkerDto): Promise<Worker> {
    const worker = await this.findOne(id);
    this.workerRepository.merge(worker, updateWorkerDto);
    return this.workerRepository.save(worker);
  }

  async remove(id: number): Promise<void> {
    const worker = await this.findOne(id);
    await this.workerRepository.remove(worker);
  }
}
