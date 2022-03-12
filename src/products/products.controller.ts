import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CategoriesService } from 'src/categories/categories.service';

@Controller('products')
export class ProductsController {
  constructor(private productsSrv: ProductsService, private categoriesSrv: CategoriesService) {}

  @Get()
  findProducts(){
    return this.productsSrv.find();
  }

  @Get('/:id')
  async findProduct(@Param('id') id: string){
    const product = await this.productsSrv.findOne(parseInt(id));
    console.log(id, product)
    if(!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Post()
  async createProduct(@Body() body: CreateProductDto){
    const category = await this.categoriesSrv.findOne(body.categoryId);
    if(!category) {
      throw new NotFoundException('Parent Category not found');
    }    
    return this.productsSrv.create(body, category);
  }

  @Patch('/:id')
  updateProduct(@Param('id') id: string, @Body() payload: Partial<UpdateProductDto>) {
    return this.productsSrv.update(parseInt(id), payload);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string){
    return this.productsSrv.remove(parseInt(id));
  }
}
