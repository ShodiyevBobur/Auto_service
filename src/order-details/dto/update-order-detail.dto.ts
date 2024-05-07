import { PartialType } from '@nestjs/swagger';
import { CreateOrderDetailsDto } from './create-order-detail.dto';


export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailsDto) {}
