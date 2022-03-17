import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
config();

console.log('params', process.env.DB_PORT, process.env.DB_HOST,process.env.DB_USER,process.env.DB_PASS)
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Only gets DTOs params and discard anything else sent on request
    })
  );
  await app.listen(process.env.PORT || 3000);
  console.log('Listening to ', process.env.PORT || 3000)
}
bootstrap();
