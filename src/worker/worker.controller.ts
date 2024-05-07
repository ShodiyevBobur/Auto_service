import { Controller, Get, Post, Body, Param, Put, Delete, Res, HttpCode, UseGuards } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { Worker } from './entities/worker.entity';
import { Response } from 'express';
import { LoginWorkerDto } from './dto/login_worker_dto';
import { Cookiegetter } from 'src/decorators/cookie_getter.decorator';
import { AdminGuard } from 'src/guards/admin.guard';

@ApiTags('workers')
@Controller('workers')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}



  @Post('signup')
  @ApiResponse({ status: 200, description: 'The admin has been successfully signed up.' }) // Response for successful signup
  singup(
    @Body() createWorkerDto: CreateWorkerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workerService.WorkerRegistration(createWorkerDto, res);
  }

  @HttpCode(200)
  @Post('login')
  @ApiResponse({ status: 200, description: 'Successfully logged in.' }) // Response for successful login
  login(
    @Body() loginWorkerDto: LoginWorkerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workerService.login(loginWorkerDto, res);
  }

  @HttpCode(200)
  @Post('logout')
  @ApiResponse({ status: 200, description: 'Successfully logged out.' }) // Response for successful logout
  logout(
    @Cookiegetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workerService.logout(refreshToken, res);
  }


  @UseGuards(AdminGuard)
  @Post(':id/refresh')
  @ApiResponse({ status: 200, description: 'Refresh token successfully generated.' }) // Response for successful refresh token generation
  refresh(
    @Param('id') id: number,
    @Cookiegetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workerService.refreshToken(+id, refreshToken, res);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new worker' })
  @ApiBody({ type: CreateWorkerDto })
  @ApiResponse({ status: 201, description: 'The worker has been successfully created.', type: Worker })
  async create(@Body() createWorkerDto: CreateWorkerDto): Promise<Worker> {
    return this.workerService.create(createWorkerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all workers' })
  @ApiResponse({ status: 200, description: 'Returns all workers.', type: [Worker] })
  async findAll(): Promise<Worker[]> {
    return this.workerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a worker by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the worker' })
  @ApiResponse({ status: 200, description: 'Returns the found worker.', type: Worker })
  async findOne(@Param('id') id: string): Promise<Worker> {
    return this.workerService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a worker' })
  @ApiParam({ name: 'id', description: 'The ID of the worker' })
  @ApiBody({ type: UpdateWorkerDto })
  @ApiResponse({ status: 200, description: 'The worker has been successfully updated.', type: Worker })
  async update(@Param('id') id: string, @Body() updateWorkerDto: UpdateWorkerDto): Promise<Worker> {
    return this.workerService.update(+id, updateWorkerDto);
  }


  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a worker by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the worker' })
  @ApiResponse({ status: 204, description: 'The worker has been successfully deleted.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.workerService.remove(+id);
  }
}
