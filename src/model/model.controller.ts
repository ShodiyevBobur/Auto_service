import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Models')
@Controller('models')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @ApiOperation({ summary: 'Create a new model' })
  @ApiBody({ type: CreateModelDto })
  @Post()
  create(@Body() createModelDto: CreateModelDto) {
    return this.modelService.create(createModelDto);
  }

  @ApiOperation({ summary: 'Get all models' })
  @Get()
  findAll() {
    return this.modelService.findAll();
  }

  @ApiOperation({ summary: 'Get a model by ID' })
  @ApiParam({ name: 'id', description: 'Model ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modelService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a model by ID' })
  @ApiParam({ name: 'id', description: 'Model ID' })
  @ApiBody({ type: UpdateModelDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModelDto: UpdateModelDto) {
    return this.modelService.update(+id, updateModelDto);
  }

  @ApiOperation({ summary: 'Delete a model by ID' })
  @ApiParam({ name: 'id', description: 'Model ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modelService.remove(+id);
  }
}
