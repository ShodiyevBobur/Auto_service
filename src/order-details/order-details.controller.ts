import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';

import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailsDto } from './dto/create-order-detail.dto';
import { OrderDetails } from './entities/order-detail.entity';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@ApiTags('Order Details')
@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @ApiOperation({ summary: 'Create order details' })
  @ApiResponse({ status: 201, description: 'The order details has been successfully created.', type: OrderDetails })
  @ApiBadRequestResponse({ description: 'Invalid input.' })
  @Post()
  async create(@Body() createOrderDetailsDto: CreateOrderDetailsDto): Promise<OrderDetails> {
    return this.orderDetailsService.create(createOrderDetailsDto);
  }

  @ApiOperation({ summary: 'Get all order details' })
  @ApiResponse({ status: 200, description: 'Returns all order details.', type: [OrderDetails] })
  @Get()
  async findAll(): Promise<OrderDetails[]> {
    return this.orderDetailsService.findAll();
  }

  @ApiOperation({ summary: 'Get order details by ID' })
  @ApiResponse({ status: 200, description: 'Returns the order details.', type: OrderDetails })
  @ApiNotFoundResponse({ description: 'Order details not found.' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<OrderDetails> {
    return this.orderDetailsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update order details by ID' })
  @ApiResponse({ status: 200, description: 'The order details has been successfully updated.', type: OrderDetails })
  @ApiNotFoundResponse({ description: 'Order details not found.' })
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateOrderDetailsDto: UpdateOrderDetailDto): Promise<OrderDetails> {
    return this.orderDetailsService.update(id, updateOrderDetailsDto);
  }

  @ApiOperation({ summary: 'Delete order details by ID' })
  @ApiResponse({ status: 204, description: 'The order details has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Order details not found.' })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.orderDetailsService.remove(id);
  }
}
