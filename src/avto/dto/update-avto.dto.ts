import { PartialType } from '@nestjs/swagger';
import { CreateAvtoDto } from './create-avto.dto';

export class UpdateAvtoDto extends PartialType(CreateAvtoDto) {}
