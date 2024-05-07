import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { OrderService } from '../order/order.service'; // Import OrderService
import { ServiceService } from '../service/service.service'; // Import ServiceService

import { WorkerService } from '../worker/worker.service'; // Import WorkerService
import { OrderDetails } from './entities/order-detail.entity';
import { AvtoService } from 'src/avto/avto.service';
import { CreateOrderDetailsDto } from './dto/create-order-detail.dto';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
    private readonly orderService: OrderService,
    private readonly serviceService: ServiceService,
    private readonly autoService: AvtoService,
    private readonly workerService: WorkerService,
  ) {}

  async create(createOrderDetailsDto: CreateOrderDetailsDto): Promise<OrderDetails> {
    const { orderId, serviceId, avtoId, workerId } = createOrderDetailsDto;

    // Check if related entities exist
    await Promise.all([
      this.orderService.findOne(orderId),
      this.serviceService.findOne(serviceId),
      this.autoService.findOne(avtoId),
      this.workerService.findOne(workerId),
    ]);

    const orderDetails = this.orderDetailsRepository.create(createOrderDetailsDto);
    return this.orderDetailsRepository.save(orderDetails);
  }

  async findAll(): Promise<OrderDetails[]> {
    return this.orderDetailsRepository.find();
  }

  async findOne(id: number): Promise<OrderDetails> {
    const orderDetails = await this.orderDetailsRepository.findOne({where:{id}});
    if (!orderDetails) {
      throw new NotFoundException('Order details not found');
    }
    return orderDetails;
  }

  async update(id: number, updateOrderDetailsDto: Partial<CreateOrderDetailsDto>): Promise<OrderDetails> {
    const orderDetails = await this.findOne(id);
    Object.assign(orderDetails, updateOrderDetailsDto);
    return this.orderDetailsRepository.save(orderDetails);
  }

  async remove(id: number): Promise<void> {
    const orderDetails = await this.findOne(id);
    await this.orderDetailsRepository.remove(orderDetails);
  }
}
