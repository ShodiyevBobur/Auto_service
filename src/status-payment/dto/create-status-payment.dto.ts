import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusPaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  statusName: string;

  // Other properties as needed
}
