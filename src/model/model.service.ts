import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModelDto } from './dto/create-model.dto';
import { Model } from './entities/model.entity';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  async create(createModelDto: CreateModelDto): Promise<Model> {
    const { name, markaId } = createModelDto;
    const model = this.modelRepository.create({ name, markaId });
    return await this.modelRepository.save(model);
  }

  async findAll(): Promise<Model[]> {
    return await this.modelRepository.find();
  }

  async findOne(id: number): Promise<Model> {
    const model = await this.modelRepository.findOne({where:{id}});
    if (!model) {
      throw new NotFoundException(`Model with ID ${id} not found`);
    }
    return model;
  }

  async update(id: number, updateModelDto: Partial<CreateModelDto>): Promise<Model> {
    const model = await this.findOne(id);
    this.modelRepository.merge(model, updateModelDto);
    return await this.modelRepository.save(model);
  }

  async remove(id: number): Promise<void> {
    const model = await this.findOne(id);
    await this.modelRepository.remove(model);
  }
}
