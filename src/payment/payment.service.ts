import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { OrderService } from '../order/order.service';
import { StatusPaymentService } from '../status-payment/status-payment.service';
import { PaymentTypeService } from '../payment-type/payment-type.service';
import { Payment } from './entities/payment.entity';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly orderService: OrderService,
    private readonly statusPaymentService: StatusPaymentService,
    private readonly paymentTypeService: PaymentTypeService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { orderId, statusId, paymentTypeId } = createPaymentDto;

    await this.validateOrderStatusPayment(orderId, statusId, paymentTypeId);

    const payment = new Payment();
    payment.order = orderId;
    payment.status = statusId;
    payment.paymentType = paymentTypeId;

    return await this.paymentRepository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return await this.paymentRepository.find();
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({where:{id}});
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async remove(id: number): Promise<void> {
    const payment = await this.findOne(id);
    await this.paymentRepository.remove(payment);
  }
  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const { orderId, statusId, paymentTypeId } = updatePaymentDto;

    await this.validateOrderStatusPayment(orderId, statusId, paymentTypeId);

    const payment = await this.findOne(id);
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    payment.order = orderId;
    payment.status = statusId;
    payment.paymentType = paymentTypeId;

    return await this.paymentRepository.save(payment);
  }

  private async validateOrderStatusPayment(orderId: number, statusId: number, paymentTypeId: number): Promise<void> {
    await this.orderService.findOne(orderId);
    await this.statusPaymentService.findOne(statusId);
    await this.paymentTypeService.findOne(paymentTypeId);
  }
}
