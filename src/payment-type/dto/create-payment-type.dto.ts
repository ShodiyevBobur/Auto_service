import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  paymentTypeName: string;


}
