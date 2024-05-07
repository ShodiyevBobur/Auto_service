import { PartialType } from '@nestjs/swagger';
import { CreateProductOrderDetailsDto } from './create-product-order-detail.dto';


export class UpdateProductOrderDetailDto extends PartialType(CreateProductOrderDetailsDto) {}
