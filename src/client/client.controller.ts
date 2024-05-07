import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';

@ApiTags('Clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Create a new client' })
  @ApiBody({ type: CreateClientDto })
  @Post()
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return await this.clientService.create(createClientDto);
  }

  @ApiOperation({ summary: 'Get all clients' })
  @Get()
  async findAll(): Promise<Client[]> {
    return await this.clientService.findAll();
  }

  @ApiOperation({ summary: 'Get a client by ID' })
  @ApiParam({ name: 'id', description: 'Client ID' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Client> {
    return await this.clientService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a client by ID' })
  @ApiParam({ name: 'id', description: 'Client ID' })
  @ApiBody({ type: UpdateClientDto })
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateClientDto: UpdateClientDto): Promise<Client> {
    return await this.clientService.update(id, updateClientDto);
  }

  @ApiOperation({ summary: 'Delete a client by ID' })
  @ApiParam({ name: 'id', description: 'Client ID' })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.clientService.remove(id);
  }
}
