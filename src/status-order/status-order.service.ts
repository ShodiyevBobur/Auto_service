import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStatusOrderDto } from './dto/create-status-order.dto';
import { StatusOrder } from './entities/status-order.entity';

@Injectable()
export class StatusOrderService {
  constructor(
    @InjectRepository(StatusOrder)
    private readonly statusOrderRepository: Repository<StatusOrder>,
  ) {}

  async create(createStatusOrderDto: CreateStatusOrderDto): Promise<StatusOrder> {
    const { orderStatus } = createStatusOrderDto;
    const statusOrder = this.statusOrderRepository.create({ orderStatus });
    return await this.statusOrderRepository.save(statusOrder);
  }

  async findAll(): Promise<StatusOrder[]> {
    return await this.statusOrderRepository.find();
  }

  async findOne(id: number): Promise<StatusOrder> {
    const statusOrder = await this.statusOrderRepository.findOne({where:{id}});
    if (!statusOrder) {
      throw new NotFoundException(`StatusOrder with ID ${id} not found`);
    }
    return statusOrder;
  }

  async update(id: number, orderStatus: string): Promise<StatusOrder> {
    const statusOrder = await this.findOne(id);
    statusOrder.orderStatus = orderStatus;
    return await this.statusOrderRepository.save(statusOrder);
  }

  async remove(id: number): Promise<void> {
    const statusOrder = await this.findOne(id);
    await this.statusOrderRepository.remove(statusOrder);
  }
}
