import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories/category.entity';
import { Product } from './products/product.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { config } from 'dotenv';
config();

console.log('params', process.env.DB_PORT, process.env.DB_HOST,process.env.DB_USER,process.env.DB_PASS)
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [ Category, Product, User ],
      synchronize: true
    }),
    CategoriesModule, 
    ProductsModule, UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
