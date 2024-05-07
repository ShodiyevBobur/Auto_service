import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStatusPaymentDto } from './dto/create-status-payment.dto';
import { UpdateStatusPaymentDto } from './dto/update-status-payment.dto';
import { StatusPayment } from './entities/status-payment.entity';

@Injectable()
export class StatusPaymentService {
  constructor(
    @InjectRepository(StatusPayment)
    private readonly statusPaymentRepository: Repository<StatusPayment>,
  ) {}

  async create(createStatusPaymentDto: CreateStatusPaymentDto): Promise<StatusPayment> {
    const { statusName } = createStatusPaymentDto;
    const statusPayment = this.statusPaymentRepository.create({ statusName });
    return await this.statusPaymentRepository.save(statusPayment);
  }

  async findAll(): Promise<StatusPayment[]> {
    return await this.statusPaymentRepository.find();
  }

  async findOne(id: number): Promise<StatusPayment> {
    const statusPayment = await this.statusPaymentRepository.findOne({where:{id}});
    if (!statusPayment) {
      throw new NotFoundException(`Status payment with ID ${id} not found`);
    }
    return statusPayment;
  }

  async update(id: number, updateStatusPaymentDto: UpdateStatusPaymentDto): Promise<StatusPayment> {
    const { statusName } = updateStatusPaymentDto;
    const statusPayment = await this.findOne(id);
    statusPayment.statusName = statusName;
    return await this.statusPaymentRepository.save(statusPayment);
  }

  async remove(id: number): Promise<void> {
    const statusPayment = await this.findOne(id);
    await this.statusPaymentRepository.remove(statusPayment);
  }
}
