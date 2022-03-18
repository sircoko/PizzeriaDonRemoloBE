import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session'); //"require" instead of "import" because of incompatibility with NestJS+TSConfig


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['cookieTest']
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Only gets DTOs params and discard anything else sent on request
    })
  );
  await app.listen(process.env.PORT || 3000);
  console.log('Listening to ', process.env.PORT || 3000)
}
bootstrap();
