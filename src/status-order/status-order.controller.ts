import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusOrderService } from './status-order.service';
import { CreateStatusOrderDto } from './dto/create-status-order.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Status Orders')
@Controller('status-orders')
export class StatusOrderController {
  constructor(private readonly statusOrderService: StatusOrderService) {}

  @ApiOperation({ summary: 'Create a new status order' })
  @ApiBody({ type: CreateStatusOrderDto })
  @Post()
  create(@Body() createStatusOrderDto: CreateStatusOrderDto) {
    return this.statusOrderService.create(createStatusOrderDto);
  }

  @ApiOperation({ summary: 'Get all status orders' })
  @Get()
  findAll() {
    return this.statusOrderService.findAll();
  }

  @ApiOperation({ summary: 'Get a status order by ID' })
  @ApiParam({ name: 'id', description: 'Status order ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusOrderService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a status order by ID' })
  @ApiParam({ name: 'id', description: 'Status order ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusOrderDto: CreateStatusOrderDto) {
    return this.statusOrderService.update(+id, updateStatusOrderDto.orderStatus);
  }

  @ApiOperation({ summary: 'Delete a status order by ID' })
  @ApiParam({ name: 'id', description: 'Status order ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusOrderService.remove(+id);
  }
}
