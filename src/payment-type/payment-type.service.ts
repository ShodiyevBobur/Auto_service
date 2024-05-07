import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';
import { PaymentType } from './entities/payment-type.entity';

@Injectable()
export class PaymentTypeService {
  constructor(
    @InjectRepository(PaymentType)
    private readonly paymentTypeRepository: Repository<PaymentType>,
  ) {}

  async create(createPaymentTypeDto: CreatePaymentTypeDto): Promise<PaymentType> {
    const { paymentTypeName } = createPaymentTypeDto;
    const paymentType = this.paymentTypeRepository.create({ paymentTypeName });
    return await this.paymentTypeRepository.save(paymentType);
  }

  async findAll(): Promise<PaymentType[]> {
    return await this.paymentTypeRepository.find();
  }

  async findOne(id: number): Promise<PaymentType> {
    const paymentType = await this.paymentTypeRepository.findOne({where:{id}});
    if (!paymentType) {
      throw new NotFoundException(`Payment type with ID ${id} not found`);
    }
    return paymentType;
  }

  async update(id: number, updatePaymentTypeDto: UpdatePaymentTypeDto): Promise<PaymentType> {
    const { paymentTypeName } = updatePaymentTypeDto;
    const paymentType = await this.findOne(id);
    paymentType.paymentTypeName = paymentTypeName;
    return await this.paymentTypeRepository.save(paymentType);
  }

  async remove(id: number): Promise<void> {
    const paymentType = await this.findOne(id);
    await this.paymentTypeRepository.remove(paymentType);
  }
}
