import { OrderDetails } from 'src/order-details/entities/order-detail.entity';
import { UsedProduct } from 'src/used-products/entities/used-product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class ProductOrderDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsedProduct, { eager: true })
  @JoinColumn({ name: 'usedProductId' })
  usedProduct: number;

  @ManyToOne(() => OrderDetails, { eager: true })
  @JoinColumn({ name: 'orderDetailsId' })
  orderDetails: number;
}
