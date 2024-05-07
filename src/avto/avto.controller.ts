import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { AvtoService } from './avto.service';
import { Avto } from './entities/avto.entity';
import { CreateAvtoDto } from './dto/create-avto.dto';
import { UpdateAvtoDto } from './dto/update-avto.dto';

@ApiTags('Avto')
@Controller('avto')
export class AvtoController {
  constructor(private readonly avtoService: AvtoService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The Avto has been successfully created.', type: Avto })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  create(@Body() createAvtoDto: CreateAvtoDto): Promise<Avto> {
    return this.avtoService.create(createAvtoDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Returns all Avto entities.', type: [Avto] })
  findAll(): Promise<Avto[]> {
    return this.avtoService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns the Avto with the specified ID.', type: Avto })
  @ApiNotFoundResponse({ description: 'Avto with the specified ID not found.' })
  findOne(@Param('id') id: string): Promise<Avto> {
    return this.avtoService.findOne(+id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'The Avto has been successfully updated.', type: Avto })
  @ApiNotFoundResponse({ description: 'Avto with the specified ID not found.' })
  update(@Param('id') id: string, @Body() updateAvtoDto: UpdateAvtoDto): Promise<Avto> {
    return this.avtoService.update(+id, updateAvtoDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The Avto has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Avto with the specified ID not found.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.avtoService.remove(+id);
  }
}
