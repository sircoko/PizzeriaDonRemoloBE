import { Controller, Get, Param, NotFoundException, Post, Body, Patch, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { CategoryDto } from './dtos/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesSrv: CategoriesService) {}

  @Get()
  findCategories(){
    return this.categoriesSrv.find();
  }

  @Serialize(CategoryDto)
  @Get('/:id')
  async findCategory(@Param('id') id: string){
    const category = await this.categoriesSrv.findOne(parseInt(id));
    if(!category) {
      console.log('Category not found')
      throw new NotFoundException('Category not found');
    }
    console.log('Category Controller', category)
    return category;
  }

  @Post()
  createCategory(@Body() body: CreateCategoryDto){
    this.categoriesSrv.create(body);
  }

  @Patch('/:id')
  updateCategory(@Param('id') id: string, @Body() payload: Partial<UpdateCategoryDto>) {
    return this.categoriesSrv.update(parseInt(id), payload);
  }

  @Delete('/:id')
  deleteCategory(@Param('id') id: string){
    return this.categoriesSrv.remove(parseInt(id));
  }
}
