import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusPaymentService } from './status-payment.service';
import { CreateStatusPaymentDto } from './dto/create-status-payment.dto';
import { UpdateStatusPaymentDto } from './dto/update-status-payment.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { StatusPayment } from './entities/status-payment.entity';


@ApiTags('Status Payments')
@Controller('status-payments')
export class StatusPaymentController {
  constructor(private readonly statusPaymentService: StatusPaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new status payment' })
  @ApiBody({ type: CreateStatusPaymentDto })
  @ApiResponse({ status: 201, description: 'The status payment has been successfully created.', type: StatusPayment })
  async create(@Body() createStatusPaymentDto: CreateStatusPaymentDto): Promise<StatusPayment> {
    return this.statusPaymentService.create(createStatusPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all status payments' })
  @ApiResponse({ status: 200, description: 'Returns all status payments.', type: [StatusPayment] })
  async findAll(): Promise<StatusPayment[]> {
    return this.statusPaymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a status payment by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Returns the status payment with the specified ID.', type: StatusPayment })
  @ApiResponse({ status: 404, description: 'Status payment not found.' })
  async findOne(@Param('id') id: string): Promise<StatusPayment> {
    return this.statusPaymentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a status payment by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateStatusPaymentDto })
  @ApiResponse({ status: 200, description: 'Returns the updated status payment.', type: StatusPayment })
  @ApiResponse({ status: 404, description: 'Status payment not found.' })
  async update(@Param('id') id: string, @Body() updateStatusPaymentDto: UpdateStatusPaymentDto): Promise<StatusPayment> {
    return this.statusPaymentService.update(+id, updateStatusPaymentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a status payment by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Status payment deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Status payment not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.statusPaymentService.remove(+id);
  }
}
