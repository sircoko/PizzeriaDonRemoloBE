import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Category } from '../../categories/category.entity';

export class CreateProductDto {
  @IsString()
  name: string;
  
  @IsString()
  description: string;
  
  @IsString()
  @IsOptional()
  image: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  categoryId: number;
}