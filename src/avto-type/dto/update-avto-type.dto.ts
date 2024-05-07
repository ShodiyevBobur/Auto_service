import { PartialType } from '@nestjs/swagger';
import { CreateAvtoTypeDto } from './create-avto-type.dto';

export class UpdateAvtoTypeDto extends PartialType(CreateAvtoTypeDto) {}
