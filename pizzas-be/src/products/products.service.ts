import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor( @InjectRepository(Product) private productRepository: Repository<Product>){}

  create(body: CreateProductDto) {
    const product = this.productRepository.create(body);
    return this.productRepository.save(product);
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id);
    return product;
  }

  find(){
    const products = this.productRepository.find();
    return products;
  }

  async update(id: number, payload: Partial<Product>){
    const product = await this.findOne(id);
    if(!product) {
      throw new NotFoundException('Product not found');
    }
    Object.assign(product, payload);
    return this.productRepository.save(product);
  }

  async remove( id: number ){
    const product = await this.findOne(id);
    if (!product){
      throw new NotFoundException('Product not found');
    }
    return this.productRepository.remove(product);
  }
}
