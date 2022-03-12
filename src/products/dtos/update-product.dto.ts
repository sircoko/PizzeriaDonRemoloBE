import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from '../../categories/category.entity';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name: string;
  
  @IsString()
  @IsOptional()
  description: string;
  
  @IsString()
  @IsOptional()
  image: string;
  
  @IsNumber()
  @IsOptional()
  price: number;
  
  @IsNumber()
  @IsOptional()
  category: Category;
}