import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAvtoTypeDto {
  @ApiProperty({ description: 'The name of the avto type' })
  @IsNotEmpty()
  @IsString()
  readonly typeName: string
}
