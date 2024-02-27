import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as CookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.use(CookieParser());
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
