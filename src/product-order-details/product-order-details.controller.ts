import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'; // Import Swagger decorators
import { ProductOrderDetailsService } from './product-order-details.service';
import { UpdateProductOrderDetailDto } from './dto/update-product-order-detail.dto';
import { CreateProductOrderDetailsDto } from './dto/create-product-order-detail.dto';

@ApiTags('product-order-details') // Define tags for the controller
@Controller('product-order-details')
export class ProductOrderDetailsController {
  constructor(private readonly productOrderDetailsService: ProductOrderDetailsService) {}

  @ApiOperation({ summary: 'Create a new product order detail' }) // Describe the operation
  @ApiBody({ type: CreateProductOrderDetailsDto }) // Define the request body schema
  @Post()
  create(@Body() createProductOrderDetailDto: CreateProductOrderDetailsDto) {
    return this.productOrderDetailsService.create(createProductOrderDetailDto);
  }

  @ApiOperation({ summary: 'Get all product order details' })
  @Get()
  findAll() {
    return this.productOrderDetailsService.findAll();
  }

  @ApiOperation({ summary: 'Get a product order detail by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Product order detail ID' }) // Define the parameter
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productOrderDetailsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a product order detail by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Product order detail ID' })
  @ApiBody({ type: UpdateProductOrderDetailDto }) // Define the request body schema
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductOrderDetailDto: UpdateProductOrderDetailDto) {
    return this.productOrderDetailsService.update(+id, updateProductOrderDetailDto);
  }

  @ApiOperation({ summary: 'Delete a product order detail by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Product order detail ID' })
  @ApiResponse({ status: 204, description: 'Product order detail deleted successfully' }) // Define the response
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productOrderDetailsService.remove(+id);
  }
}
