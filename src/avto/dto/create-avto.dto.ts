import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAvtoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  avtoNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  avtoTypeId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  modelId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  clientId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  markaId: number;
}
