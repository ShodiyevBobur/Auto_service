import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './client/client.module';
import { MarkaModule } from './marka/marka.module';
import { ModelModule } from './model/model.module';
import { AvtoTypeModule } from './avto-type/avto-type.module';
import { StatusOrderModule } from './status-order/status-order.module';
import { OrderModule } from './order/order.module';
import { PaymentTypeModule } from './payment-type/payment-type.module';
import { StatusPaymentModule } from './status-payment/status-payment.module';
import { PaymentModule } from './payment/payment.module';
import { AvtoModule } from './avto/avto.module';
import { AdminModule } from './admin/admin.module';
import { UsedProductModule } from './used-products/used-products.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { ServiceModule } from './service/service.module';
import { WorkerModule } from './worker/worker.module';
import { ProductOrderDetailsModule } from './product-order-details/product-order-details.module';




@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'postgres'>('TYPEORM_CONNECTION'),
        host: config.get<string>('TYPEORM_HOST'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        port: config.get<number>('TYPEORM_PORT'),
        database: config.get<string>('TYPEORM_DATABASE'),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: false,
      }),
    }),
    
    ClientModule,
    
    MarkaModule,
    
    ModelModule,
    
    AvtoTypeModule,
    
    StatusOrderModule,
    
    OrderModule,
    
    PaymentTypeModule,
    
    StatusPaymentModule,
    
    PaymentModule,
    
    AvtoModule,
    
    AdminModule,
    
    UsedProductModule,
    
    OrderDetailsModule,
    
    ServiceModule,
    
    WorkerModule,
    
    ProductOrderDetailsModule,
    


  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
