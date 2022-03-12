import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, JoinTable } from 'typeorm';
import { Category } from '../categories/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @ManyToOne( () => Category, (category) => category.products)
  category: Category;
}