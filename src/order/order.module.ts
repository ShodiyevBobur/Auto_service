import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ClientModule } from '../client/client.module'; // Assuming you have a ClientModule
import { StatusOrderModule } from '../status-order/status-order.module'; // Assuming you have a StatusOrderModule
import { Order } from './entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]), // Registering the Order entity with TypeOrmModule
    ClientModule, // Importing the ClientModule to access its services
    StatusOrderModule, // Importing the StatusOrderModule to access its services
  ],
  controllers: [OrderController], // Declaring the OrderController
  providers: [OrderService], // Declaring the OrderService
  exports:[OrderService]
})
export class OrderModule {}
