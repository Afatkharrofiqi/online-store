import { Product } from '@model/product';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  createOrUpdate(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  findByIds(ids: string[]): Promise<Product[]> {
    return this.productRepository.findBy({ id: In(ids) });
  }
}
