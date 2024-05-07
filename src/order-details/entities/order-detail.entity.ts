import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Avto } from 'src/avto/entities/avto.entity';
import { Order } from 'src/order/entities/order.entity';
import { Service } from 'src/service/entities/service.entity';
import { Worker } from 'src/worker/entities/worker.entity';

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Service, { eager: true })
  @JoinColumn({ name: 'service_id' })
  @ApiProperty({ type: () => Service })
  serviceId: number;

  @ManyToOne(() => Avto, { eager: true })
  @JoinColumn({ name: 'avto_id' })
  @ApiProperty({ type: () => Avto })
  avtoId: number;

  @ManyToOne(() => Worker, { eager: true })
  @JoinColumn({ name: 'worker_id' })
  @ApiProperty({ type: () => Worker })
  workerId: number;

  @ManyToOne(() => Order, { eager: true })
  @JoinColumn({ name: 'order_id' })
  @ApiProperty({ type: () => Order })
  orderId: number;
}
