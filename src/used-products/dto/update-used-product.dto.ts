import { PartialType } from '@nestjs/swagger';
import { CreateUsedProductDto } from './create-used-product.dto';

export class UpdateUsedProductDto extends PartialType(CreateUsedProductDto) {}
