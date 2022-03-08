import { Expose } from "class-transformer";
import { Product } from '../../products/product.entity';
import { ProductDto } from '../../products/dtos/product.dto';

export class CategoryDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  image: string;

  @Expose()
  products: Product;
}