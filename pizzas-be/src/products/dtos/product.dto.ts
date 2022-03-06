import { Expose, Transform } from "class-transformer";
import { Category } from '../../categories/category.entity';

export class ProductDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  image: string;

  @Expose()
  price: number;

  @Transform( ( { obj } ) => obj.category.id)
  @Expose()
  categoryId: Category;
}