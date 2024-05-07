import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMarkaDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
