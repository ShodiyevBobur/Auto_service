import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class PaymentType {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'payment_type_name' }) // Define column name as 'payment_type_name'
  @ApiProperty()
  paymentTypeName: string;


}
