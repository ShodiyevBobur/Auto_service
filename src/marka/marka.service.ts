import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMarkaDto } from './dto/create-marka.dto';
import { Marka } from './entities/marka.entity';
import { UpdateMarkaDto } from './dto/update-marka.dto';

@Injectable()
export class MarkaService {
  constructor(
    @InjectRepository(Marka)
    private readonly markaRepository: Repository<Marka>,
  ) {}

  async create(createMarkaDto: CreateMarkaDto): Promise<Marka> {
    const { name } = createMarkaDto;
    const newMarka = this.markaRepository.create({ name });
    return await this.markaRepository.save(newMarka);
  }

  async findAll(): Promise<Marka[]> {
    return await this.markaRepository.find();
  }

  async findOne(id: number): Promise<Marka> {
    const marka =  await this.markaRepository.findOne({where:{id}});
    if(!marka){
      throw new NotFoundException(`Marka with id ${id} not found`);
    }
    return marka
  }

  async update(id: number, updateMarkaDto: UpdateMarkaDto): Promise<Marka> {
    const { name } = updateMarkaDto;
    const markaToUpdate = await this.markaRepository.findOne({where:{id}});
    if (!markaToUpdate) {
      throw new NotFoundException(`Marka with id ${id} not found`);
    }

    markaToUpdate.name = name;
    return await this.markaRepository.save(markaToUpdate);
  }

  async remove(id: number): Promise<void> {
    const markaToRemove = await this.markaRepository.findOne({where:{id}});
    if (!markaToRemove) {
      throw new NotFoundException(`Marka with id ${id} not found`);
    }
    await this.markaRepository.remove(markaToRemove);
  }
}
