import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor( @InjectRepository(Category) private categoryRepository: Repository<Category>){}

  create(body: CreateCategoryDto) {
    console.log(body);
    const category = this.categoryRepository.create(body);
    return this.categoryRepository.save(category);
  }

  findOne(id: number) {
    const category = this.categoryRepository.findOne(id);
    return category;
  }

  find(){
    const categories = this.categoryRepository.find();
    return categories;
  }

  async update(id: number, payload: Partial<Category>){
    const category = await this.findOne(id);
    if(!category) {
      throw new NotFoundException('Category not found');
    }
    Object.assign(category, payload);
    return this.categoryRepository.save(category);
  }

  async remove( id: number ){
    const category = await this.findOne(id);
    if (!category){
      throw new NotFoundException('Category not found');
    }
    return this.categoryRepository.remove(category);
  }
}
