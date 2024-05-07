import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  statusId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  paymentTypeId: number;
}
