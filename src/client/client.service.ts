import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';


@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const newClient = this.clientRepository.create(createClientDto);
    return await this.clientRepository.save(newClient);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({where:{id}});
    if(!client){
      throw new NotFoundException(`Client  ${id} not found`);
    }
    return client
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const clientToUpdate = await this.clientRepository.findOne({where:{id}});
    if (!clientToUpdate) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    const updatedClient = { ...clientToUpdate, ...updateClientDto };
    return await this.clientRepository.save(updatedClient);
  }

  async remove(id: number): Promise<void> {
    const clientToRemove = await this.clientRepository.findOne({where:{id}});
    if (!clientToRemove) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    await this.clientRepository.remove(clientToRemove);
  }
}
