import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';



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
