import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './product.entity';
import { CategoryDto } from '../categories/dtos/category.dto';
import { Category } from '../categories/category.entity';

@Injectable()
export class ProductsService {
  constructor( @InjectRepository(Product) private productRepository: Repository<Product>){}

  create(body: CreateProductDto, category: Category) {
    const product = this.productRepository.create(body);
    product.category = category;
    return this.productRepository.save(product);
  }

  findOne(id: number) {
    const product = this.productRepository.findOne(id);
    return product;
  }

  async find(){
    const products = await this.productRepository.find();
    console.log(products)
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
