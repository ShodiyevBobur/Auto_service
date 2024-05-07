import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetailsService } from '../order-details/order-details.service';
import { ProductOrderDetails } from './entities/product-order-detail.entity';
import { CreateProductOrderDetailsDto } from './dto/create-product-order-detail.dto';
import { UsedProductService } from 'src/used-products/used-products.service';
import { UpdateProductOrderDetailDto } from './dto/update-product-order-detail.dto';

@Injectable()
export class ProductOrderDetailsService {
  constructor(
    @InjectRepository(ProductOrderDetails)
    private readonly productOrderDetailsRepository: Repository<ProductOrderDetails>,
    private readonly orderDetailsService: OrderDetailsService,
    private readonly usedProductsService: UsedProductService,
  ) {}

  async create(createProductOrderDetailsDto: CreateProductOrderDetailsDto): Promise<ProductOrderDetails> {
    const { orderDetailsId, usedProductId } = createProductOrderDetailsDto;

    await this.validateOrderDetailsAndUsedProduct(orderDetailsId, usedProductId);

    const productOrderDetails = new ProductOrderDetails();
    productOrderDetails.orderDetails = orderDetailsId;
    productOrderDetails.usedProduct = usedProductId;

    return await this.productOrderDetailsRepository.save(productOrderDetails);
  }

  async findAll(): Promise<ProductOrderDetails[]> {
    return await this.productOrderDetailsRepository.find();
  }

  async findOne(id: number): Promise<ProductOrderDetails> {
    const productOrderDetails = await this.productOrderDetailsRepository.findOne({where:{id}});
    if (!productOrderDetails) {
      throw new NotFoundException(`ProductOrderDetails with ID ${id} not found`);
    }
    return productOrderDetails;
  }

  async remove(id: number): Promise<void> {
    const productOrderDetails = await this.findOne(id);
    await this.productOrderDetailsRepository.remove(productOrderDetails);
  }

  async update(id: number, updateProductOrderDetailsDto: UpdateProductOrderDetailDto): Promise<ProductOrderDetails> {
    const { orderDetailsId, usedProductId } = updateProductOrderDetailsDto;

    await this.validateOrderDetailsAndUsedProduct(orderDetailsId, usedProductId);

    const productOrderDetails = await this.findOne(id);
    if (!productOrderDetails) {
      throw new NotFoundException(`ProductOrderDetails with ID ${id} not found`);
    }

    productOrderDetails.orderDetails = orderDetailsId;
    productOrderDetails.usedProduct = usedProductId;

    return await this.productOrderDetailsRepository.save(productOrderDetails);
  }

  private async validateOrderDetailsAndUsedProduct(orderDetailsId: number, usedProductId: number): Promise<void> {
    await this.orderDetailsService.findOne(orderDetailsId);
    await this.usedProductsService.findOne(usedProductId);
  }
}
