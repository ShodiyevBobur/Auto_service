import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOrderDetailsService } from './product-order-details.service';
import { OrderDetailsModule } from '../order-details/order-details.module';
import { ProductOrderDetailsController } from './product-order-details.controller';
import { ProductOrderDetails } from './entities/product-order-detail.entity';
import { UsedProductModule } from 'src/used-products/used-products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductOrderDetails]),
    OrderDetailsModule, // Import the OrderDetailsModule to use its service
    UsedProductModule, // Import the UsedProductsModule to use its service
  ],
  providers: [ProductOrderDetailsService],
  controllers: [ProductOrderDetailsController],
})
export class ProductOrderDetailsModule {}
