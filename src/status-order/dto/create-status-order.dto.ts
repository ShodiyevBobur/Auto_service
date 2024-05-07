import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusOrderDto {
  @ApiProperty({ description: 'The status of the order' })
  @IsNotEmpty()
  @IsString()
  readonly orderStatus: string;
}
