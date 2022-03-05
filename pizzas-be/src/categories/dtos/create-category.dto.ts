import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;
  
  @IsString()
  description: string;
  
  @IsString()
  @IsOptional()
  image: string;
}