import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateModelDto {
  @ApiProperty({ description: 'The name of the model' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The markaId associated with the model' })
  @IsNotEmpty()
  @IsNumber()
  readonly markaId: number;

}
