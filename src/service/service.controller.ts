import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Service } from './entities/service.entity';

@ApiTags('services')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new service' })
  @ApiBody({ type: CreateServiceDto })
  @ApiResponse({ status: 201, description: 'The service has been successfully created.', type: Service })
  async create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all services' })
  @ApiResponse({ status: 200, description: 'Returns all services.', type: [Service] })
  async findAll(): Promise<Service[]> {
    return this.serviceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a service by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the service' })
  @ApiResponse({ status: 200, description: 'Returns the found service.', type: Service })
  async findOne(@Param('id') id: string): Promise<Service> {
    return this.serviceService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a service' })
  @ApiParam({ name: 'id', description: 'The ID of the service' })
  @ApiBody({ type: UpdateServiceDto })
  @ApiResponse({ status: 200, description: 'The service has been successfully updated.', type: Service })
  async update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto): Promise<Service> {
    return this.serviceService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a service by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the service' })
  @ApiResponse({ status: 204, description: 'The service has been successfully deleted.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.serviceService.remove(+id);
  }
}
