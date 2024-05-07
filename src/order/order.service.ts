import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientService } from '../client/client.service';
import { StatusOrderService } from '../status-order/status-order.service';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly clientService: ClientService,
    private readonly statusOrderService: StatusOrderService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { clientId, statusId, total_price } = createOrderDto;

    await this.validateClientAndStatus(clientId, statusId);

    const order = new Order();
    order.total_price = total_price;
    order.client = clientId;
    order.status = statusId;

    return await this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({where:{id}});
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const { clientId, statusId, total_price } = updateOrderDto;

    await this.validateClientAndStatus(clientId, statusId);

    const order = await this.findOne(id);
    order.total_price = total_price;
    order.client = clientId;
    order.status = statusId;

    return await this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }

  private async validateClientAndStatus(clientId: number, statusId: number): Promise<void> {
    await this.clientService.findOne(clientId);
    await this.statusOrderService.findOne(statusId);
  }
}
