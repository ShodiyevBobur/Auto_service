import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarkaService } from './marka.service';
import { CreateMarkaDto } from './dto/create-marka.dto';
import { UpdateMarkaDto } from './dto/update-marka.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Marka')
@Controller('marka')
export class MarkaController {
  constructor(private readonly markaService: MarkaService) {}

  @ApiOperation({ summary: 'Create a new Marka' })
  @ApiBody({ type: CreateMarkaDto })
  @Post()
  create(@Body() createMarkaDto: CreateMarkaDto) {
    return this.markaService.create(createMarkaDto);
  }

  @ApiOperation({ summary: 'Get all Markas' })
  @Get()
  findAll() {
    return this.markaService.findAll();
  }

  @ApiOperation({ summary: 'Get a Marka by ID' })
  @ApiParam({ name: 'id', description: 'Marka ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.markaService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a Marka by ID' })
  @ApiParam({ name: 'id', description: 'Marka ID' })
  @ApiBody({ type: UpdateMarkaDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarkaDto: UpdateMarkaDto) {
    return this.markaService.update(+id, updateMarkaDto);
  }

  @ApiOperation({ summary: 'Delete a Marka by ID' })
  @ApiParam({ name: 'id', description: 'Marka ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.markaService.remove(+id);
  }
}
