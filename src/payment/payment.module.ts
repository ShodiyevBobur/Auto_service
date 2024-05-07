import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { OrderModule } from '../order/order.module';
import { StatusPaymentModule } from '../status-payment/status-payment.module';
import { PaymentTypeModule } from '../payment-type/payment-type.module';
import { Payment } from './entities/payment.entity';
import { PaymentController } from './payment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    OrderModule,
    StatusPaymentModule,
    PaymentTypeModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
