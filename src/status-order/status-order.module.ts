import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusOrderService } from './status-order.service';
import { StatusOrderController } from './status-order.controller';
import { StatusOrder } from './entities/status-order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StatusOrder]), // Importing the StatusOrder entity into the module
  ],
  providers: [StatusOrderService], // Registering the service
  controllers: [StatusOrderController], // Registering the controller
  exports: [StatusOrderService], // Exporting the service if needed
})
export class StatusOrderModule {}
