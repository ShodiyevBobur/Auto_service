import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avto } from './entities/avto.entity';
import { AvtoController } from './avto.controller';
import { AvtoService } from './avto.service';
import { OrderModule } from '../order/order.module';
import { AvtoTypeModule } from '../avto-type/avto-type.module';
import { ModelModule } from '../model/model.module';
import { ClientModule } from '../client/client.module';
import { MarkaModule } from '../marka/marka.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Avto]),
    OrderModule,
    AvtoTypeModule,
    ModelModule,
    ClientModule,
    MarkaModule,
  ],
  controllers: [AvtoController],
  providers: [AvtoService],
  exports:[AvtoService]
})
export class AvtoModule {}
