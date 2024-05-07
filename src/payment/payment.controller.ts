import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 201, description: 'Payment created successfully', type: Payment })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return await this.paymentService.create(createPaymentDto);
  }

  @ApiOperation({ summary: 'Get all payments' })
  @ApiResponse({ status: 200, description: 'Return all payments', type: [Payment] })
  @Get()
  async getAllPayments(): Promise<Payment[]> {
    return await this.paymentService.findAll();
  }

  @ApiOperation({ summary: 'Get a payment by ID' })
  @ApiResponse({ status: 200, description: 'Return the payment', type: Payment })
  @ApiNotFoundResponse({ description: 'Payment not found' })
  @Get(':id')
  async getPaymentById(@Param('id', ParseIntPipe) id: number): Promise<Payment> {
    const payment = await this.paymentService.findOne(id);
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  @ApiOperation({ summary: 'Update a payment by ID' })
  @ApiResponse({ status: 200, description: 'Payment updated successfully', type: Payment })
  @ApiNotFoundResponse({ description: 'Payment not found' })
  @Put(':id')
  async updatePayment(@Param('id', ParseIntPipe) id: number, @Body() updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    return await this.paymentService.update(id, updatePaymentDto);
  }

  @ApiOperation({ summary: 'Delete a payment by ID' })
  @ApiResponse({ status: 200, description: 'Payment deleted successfully' })
  @ApiNotFoundResponse({ description: 'Payment not found' })
  @Delete(':id')
  async deletePayment(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.paymentService.remove(id);
  }
}
