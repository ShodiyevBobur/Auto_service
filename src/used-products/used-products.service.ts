import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUsedProductDto } from './dto/create-used-product.dto';
import { UsedProduct } from './entities/used-product.entity';

@Injectable()
export class UsedProductService {
  constructor(
    @InjectRepository(UsedProduct)
    private readonly usedProductRepository: Repository<UsedProduct>,
  ) {}

  async create(createUsedProductDto: CreateUsedProductDto): Promise<UsedProduct> {
    const usedProduct = new UsedProduct();
    usedProduct.name = createUsedProductDto.name;
    usedProduct.price = createUsedProductDto.price;
    usedProduct.count = createUsedProductDto.count;
    return this.usedProductRepository.save(usedProduct);
  }

  async findAll(): Promise<UsedProduct[]> {
    return this.usedProductRepository.find();
  }

  async findOne(id: number): Promise<UsedProduct> {
    return this.usedProductRepository.findOne({where:{id}});
  }

  async update(id: number, updateUsedProductDto: Partial<CreateUsedProductDto>): Promise<UsedProduct> {
    const usedProduct = await this.usedProductRepository.findOne({where:{id}});
    if (!usedProduct) {
      // Handle error
      throw new Error('Used product not found');
    }
    Object.assign(usedProduct, updateUsedProductDto);
    return this.usedProductRepository.save(usedProduct);
  }

  async remove(id: number): Promise<void> {
    await this.usedProductRepository.delete(id);
  }
}
