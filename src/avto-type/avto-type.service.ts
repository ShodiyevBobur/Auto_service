import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAvtoTypeDto } from './dto/create-avto-type.dto';
import { AvtoType } from './entities/avto-type.entity';

@Injectable()
export class AvtoTypeService {
  constructor(
    @InjectRepository(AvtoType)
    private readonly avtoTypeRepository: Repository<AvtoType>,
  ) {}

  async create(createAvtoTypeDto: CreateAvtoTypeDto): Promise<AvtoType> {
    const { typeName } = createAvtoTypeDto;
    const avtoType = this.avtoTypeRepository.create({ typeName });
    return await this.avtoTypeRepository.save(avtoType);
  }

  async findAll(): Promise<AvtoType[]> {
    return await this.avtoTypeRepository.find();
  }

  async findOne(id: number): Promise<AvtoType> {
    const avtoType = await this.avtoTypeRepository.findOne({where:{id}});
    if (!avtoType) {
      throw new NotFoundException(`AvtoType with ID ${id} not found`);
    }
    return avtoType;
  }

  async update(id: number, updateAvtoTypeDto: Partial<CreateAvtoTypeDto>): Promise<AvtoType> {
    const avtoType = await this.findOne(id);
    this.avtoTypeRepository.merge(avtoType, updateAvtoTypeDto);
    return await this.avtoTypeRepository.save(avtoType);
  }

  async remove(id: number): Promise<void> {
    const avtoType = await this.findOne(id);
    await this.avtoTypeRepository.remove(avtoType);
  }
}
