import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTypeController } from './payment-type.controller';
import { PaymentTypeService } from './payment-type.service';
import { PaymentType } from './entities/payment-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentType])],
  controllers: [PaymentTypeController],
  providers: [PaymentTypeService],
  exports:[PaymentTypeService]
})
export class PaymentTypeModule {}
  