import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvtoTypeService } from './avto-type.service';
import { CreateAvtoTypeDto } from './dto/create-avto-type.dto';
import { UpdateAvtoTypeDto } from './dto/update-avto-type.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Avto Types')
@Controller('avto-types')
export class AvtoTypeController {
  constructor(private readonly avtoTypeService: AvtoTypeService) {}

  @ApiOperation({ summary: 'Create a new avto type' })
  @ApiBody({ type: CreateAvtoTypeDto })
  @Post()
  create(@Body() createAvtoTypeDto: CreateAvtoTypeDto) {
    return this.avtoTypeService.create(createAvtoTypeDto);
  }

  @ApiOperation({ summary: 'Get all avto types' })
  @Get()
  findAll() {
    return this.avtoTypeService.findAll();
  }

  @ApiOperation({ summary: 'Get an avto type by ID' })
  @ApiParam({ name: 'id', description: 'Avto type ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.avtoTypeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an avto type by ID' })
  @ApiParam({ name: 'id', description: 'Avto type ID' })
  @ApiBody({ type: UpdateAvtoTypeDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAvtoTypeDto: UpdateAvtoTypeDto) {
    return this.avtoTypeService.update(+id, updateAvtoTypeDto);
  }

  @ApiOperation({ summary: 'Delete an avto type by ID' })
  @ApiParam({ name: 'id', description: 'Avto type ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.avtoTypeService.remove(+id);
  }
}
