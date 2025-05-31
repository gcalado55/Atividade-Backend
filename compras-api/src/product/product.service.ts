import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async update(id: number, product: Partial<Product>): Promise<Product | null> {
    await this.productRepository.update(id, product);
    const updatedProduct = await this.productRepository.findOneBy({ id });
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
    const deletedProduct = await this.productRepository.findOneBy({ id });
    if (!deletedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return
  }
}
