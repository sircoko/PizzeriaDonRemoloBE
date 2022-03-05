import { Controller, Get, Param, NotFoundException, Post, Body, Patch, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesSrv: CategoriesService) {}

  @Get()
  findCategories(){
    return this.categoriesSrv.find();
  }

  @Get('/:id')
  findCategory(@Param('id') id: string){
    const category = this.categoriesSrv.findOne(parseInt(id));
    if(!category) {
      throw new NotFoundException('Category not found');
    }
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
