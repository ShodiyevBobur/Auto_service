import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Client } from 'src/client/entities/client.entity';
import { StatusOrder } from 'src/status-order/entities/status-order.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  total_price: number;

  @ManyToOne(() => Client, { eager: true })
  @JoinColumn({ name: 'client_id' })
  @ApiProperty({ type: () => Client })
  client: number;

  @ManyToOne(() => StatusOrder, { eager: true })
  @JoinColumn({ name: 'status_id' })
  @ApiProperty({ type: () => StatusOrder })
  status: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;
}
