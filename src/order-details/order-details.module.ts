import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderDetailsService } from './order-details.service';
import { OrderDetailsController } from './order-details.controller';
import { OrderModule } from '../order/order.module'; // Import OrderModule
import { ServiceModule } from '../service/service.module'; // Import ServiceModule

import { WorkerModule } from '../worker/worker.module'; // Import WorkerModule
import { OrderDetails } from './entities/order-detail.entity';
import { AvtoModule } from 'src/avto/avto.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetails]),
    OrderModule, // Import OrderModule to access OrderService
    ServiceModule, // Import ServiceModule to access ServiceService
    AvtoModule, // Import AutoModule to access AutoService
    WorkerModule, // Import WorkerModule to access WorkerService
  ],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
  exports: [OrderDetailsService], // Export OrderDetailsService for dependency injection
})
export class OrderDetailsModule {}
