import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsedProduct } from './entities/used-product.entity';
import { UsedProductService } from './used-products.service';
import { UsedProductController } from './used-products.controller';



@Module({
  imports: [TypeOrmModule.forFeature([UsedProduct])],
  providers: [UsedProductService],
  controllers: [UsedProductController],
  exports: [UsedProductService],
})
export class UsedProductModule {}
