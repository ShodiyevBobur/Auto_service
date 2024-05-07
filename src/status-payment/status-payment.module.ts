import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusPaymentController } from './status-payment.controller';
import { StatusPaymentService } from './status-payment.service';
import { StatusPayment } from './entities/status-payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatusPayment])],
  controllers: [StatusPaymentController],
  providers: [StatusPaymentService],
  exports:[StatusPaymentService]
})
export class StatusPaymentModule {}
