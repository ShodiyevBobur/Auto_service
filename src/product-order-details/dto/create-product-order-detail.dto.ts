import { ApiProperty } from '@nestjs/swagger';

export class CreateProductOrderDetailsDto {
  @ApiProperty()
  usedProductId: number;

  @ApiProperty()
  orderDetailsId: number;
}
