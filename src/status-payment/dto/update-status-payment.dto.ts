import { PartialType } from '@nestjs/swagger';
import { CreateStatusPaymentDto } from './create-status-payment.dto';

export class UpdateStatusPaymentDto extends PartialType(CreateStatusPaymentDto) {}
