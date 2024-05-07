import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsPositive, IsInt } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ description: 'Total price of the order' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly total_price: number;

  @ApiProperty({ description: 'ID of the client associated with the order' })
  @IsNotEmpty()
  @IsInt()
  readonly clientId: number;

  @ApiProperty({ description: 'ID of the status associated with the order' })
  @IsNotEmpty()
  @IsInt()
  readonly statusId: number;
}
