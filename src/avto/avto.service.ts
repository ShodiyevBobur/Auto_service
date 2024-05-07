import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAvtoDto } from './dto/create-avto.dto';
import { UpdateAvtoDto } from './dto/update-avto.dto';
import { Avto } from './entities/avto.entity';
import { OrderService } from '../order/order.service';
import { AvtoTypeService } from '../avto-type/avto-type.service';
import { ModelService } from '../model/model.service';
import { ClientService } from '../client/client.service';
import { MarkaService } from '../marka/marka.service';

@Injectable()
export class AvtoService {
  constructor(
    @InjectRepository(Avto)
    private readonly avtoRepository: Repository<Avto>,
    private readonly orderService: OrderService,
    private readonly avtoTypeService: AvtoTypeService,
    private readonly modelService: ModelService,
    private readonly clientService: ClientService,
    private readonly markaService: MarkaService,
  ) {}

  async create(createAvtoDto: CreateAvtoDto): Promise<Avto> {
    const { avtoTypeId, modelId, avtoNumber, clientId, markaId } = createAvtoDto;

    await this.validateAvto(avtoTypeId, modelId, clientId, markaId);

    const avto = new Avto();
    avto.avtoType = avtoTypeId;
    avto.model = modelId;
    avto.avtoNumber = avtoNumber;
    avto.client = clientId;
    avto.marka = markaId;

    return await this.avtoRepository.save(avto);
  }

  async findAll(): Promise<Avto[]> {
    return await this.avtoRepository.find();
  }

  async findOne(id: number): Promise<Avto> {
    const avto = await this.avtoRepository.findOne({where:{id}});
    if (!avto) {
      throw new NotFoundException(`Avto with ID ${id} not found`);
    }
    return avto;
  }

  async remove(id: number): Promise<void> {
    const avto = await this.findOne(id);
    await this.avtoRepository.remove(avto);
  }

  async update(id: number, updateAvtoDto: UpdateAvtoDto): Promise<Avto> {
    const avto = await this.findOne(id);
    this.avtoRepository.merge(avto, updateAvtoDto);
    return await this.avtoRepository.save(avto);
  }

  private async validateAvto(avtoTypeId: number, modelId: number, clientId: number, markaId: number): Promise<void> {
    await this.avtoTypeService.findOne(avtoTypeId);
    await this.modelService.findOne(modelId);
    await this.clientService.findOne(clientId);
    await this.markaService.findOne(markaId);
  }
}
