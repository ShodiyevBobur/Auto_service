import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';

import { CreateUsedProductDto } from './dto/create-used-product.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UsedProductService } from './used-products.service';
import { UsedProduct } from './entities/used-product.entity';

@ApiTags('used-products')
@Controller('used-products')
export class UsedProductController {
  constructor(private readonly usedProductService: UsedProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new used product' })
  @ApiBody({ type: CreateUsedProductDto })
  @ApiResponse({ status: 201, description: 'The used product has been successfully created.', type: UsedProduct })
  async create(@Body() createUsedProductDto: CreateUsedProductDto): Promise<UsedProduct> {
    return this.usedProductService.create(createUsedProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all used products' })
  @ApiResponse({ status: 200, description: 'Returns all used products.', type: [UsedProduct] })
  async findAll(): Promise<UsedProduct[]> {
    return this.usedProductService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a used product by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the used product' })
  @ApiResponse({ status: 200, description: 'Returns the found used product.', type: UsedProduct })
  async findOne(@Param('id') id: string): Promise<UsedProduct> {
    return this.usedProductService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a used product' })
  @ApiParam({ name: 'id', description: 'The ID of the used product' })
  @ApiBody({ type: CreateUsedProductDto })
  @ApiResponse({ status: 200, description: 'The used product has been successfully updated.', type: UsedProduct })
  async update(@Param('id') id: string, @Body() updateUsedProductDto: Partial<CreateUsedProductDto>): Promise<UsedProduct> {
    return this.usedProductService.update(+id, updateUsedProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a used product by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the used product' })
  @ApiResponse({ status: 204, description: 'The used product has been successfully deleted.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.usedProductService.remove(+id);
  }
}
