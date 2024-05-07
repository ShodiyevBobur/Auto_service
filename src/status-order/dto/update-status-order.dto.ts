import { PartialType } from '@nestjs/swagger';
import { CreateStatusOrderDto } from './create-status-order.dto';

export class UpdateStatusOrderDto extends PartialType(CreateStatusOrderDto) {}
