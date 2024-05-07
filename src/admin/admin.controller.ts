import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger'; // Import Swagger decorators
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Response } from 'express';
import { LoginAdminDto } from './dto/login_admin_dto';
import { Cookiegetter } from 'src/decorators/cookie_getter.decorator';
import { AdminGuard } from 'src/guards/admin.guard';
import { creatorGuard } from 'src/guards/admin.creator.guard';
import { SelfAdminGuard } from 'src/guards/self.admin.guard';

@ApiTags('Admin') // Tag for the controller
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The admin has been successfully created.' }) // Response for successful creation
  @ApiBadRequestResponse({ description: 'Invalid data provided.' }) // Error response for invalid input
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(creatorGuard)
  @UseGuards(AdminGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'Returns all admins.' }) // Response for successful retrieval
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(SelfAdminGuard)
  @UseGuards(AdminGuard)
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns the admin with the specified ID.' }) // Response for successful retrieval
  @ApiNotFoundResponse({ description: 'Admin with the specified ID not found.' }) // Error response for admin not found
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'The admin has been successfully updated.' }) // Response for successful update
  @ApiNotFoundResponse({ description: 'Admin with the specified ID not found.' }) // Error response for admin not found
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The admin has been successfully deleted.' }) // Response for successful deletion
  @ApiNotFoundResponse({ description: 'Admin with the specified ID not found.' }) // Error response for admin not found
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  @Post('signup')
  @ApiResponse({ status: 200, description: 'The admin has been successfully signed up.' }) // Response for successful signup
  singup(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.Adminregistration(createAdminDto, res);
  }

  @HttpCode(200)
  @Post('login')
  @ApiResponse({ status: 200, description: 'Successfully logged in.' }) // Response for successful login
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @HttpCode(200)
  @Post('logout')
  @ApiResponse({ status: 200, description: 'Successfully logged out.' }) // Response for successful logout
  logout(
    @Cookiegetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @Post(':id/refresh')
  @ApiResponse({ status: 200, description: 'Refresh token successfully generated.' }) // Response for successful refresh token generation
  refresh(
    @Param('id') id: number,
    @Cookiegetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }

  @Get('activate/:link')
  @ApiResponse({ status: 200, description: 'Account successfully activated.' }) // Response for successful account activation
  activate(@Param('link') link: string) {
    return this.adminService.activate(link);
  }
}
