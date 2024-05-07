import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/order/entities/order.entity';
import { StatusOrder } from 'src/status-order/entities/status-order.entity';
import { PaymentType } from 'src/payment-type/entities/payment-type.entity';


@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Order, { eager: true })
  @JoinColumn({ name: 'order_id' })
  @ApiProperty({ type: () => Order })
  order: number;

  @ManyToOne(() => StatusOrder, { eager: true })
  @JoinColumn({ name: 'status_id' })
  @ApiProperty({ type: () => StatusOrder })
  status: number;

  @ManyToOne(() => PaymentType, { eager: true })
  @JoinColumn({ name: 'payment_type_id' })
  @ApiProperty({ type: () => PaymentType })
  paymentType: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;
}
