import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentTypeService } from './payment-type.service';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { PaymentType } from './entities/payment-type.entity';


@ApiTags('Payment Types')
@Controller('payment-types')
export class PaymentTypeController {
  constructor(private readonly paymentTypeService: PaymentTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payment type' })
  @ApiBody({ type: CreatePaymentTypeDto })
  async create(@Body() createPaymentTypeDto: CreatePaymentTypeDto): Promise<PaymentType> {
    return this.paymentTypeService.create(createPaymentTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payment types' })
  async findAll(): Promise<PaymentType[]> {
    return this.paymentTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a payment type by ID' })
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id') id: string): Promise<PaymentType> {
    return this.paymentTypeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a payment type by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdatePaymentTypeDto })
  async update(@Param('id') id: string, @Body() updatePaymentTypeDto: UpdatePaymentTypeDto): Promise<PaymentType> {
    return this.paymentTypeService.update(+id, updatePaymentTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payment type by ID' })
  @ApiParam({ name: 'id', type: Number })
  async remove(@Param('id') id: string): Promise<void> {
    return this.paymentTypeService.remove(+id);
  }
}
