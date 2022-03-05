import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsSrv: ProductsService) {}

  @Get()
  findProducts(){
    return this.productsSrv.find();
  }

  @Get('/:id')
  findProduct(@Param('id') id: string){
    const product = this.productsSrv.findOne(parseInt(id));
    console.log(id, product)
    if(!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Post()
  createProduct(@Body() body: CreateProductDto){
    this.productsSrv.create(body);
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
