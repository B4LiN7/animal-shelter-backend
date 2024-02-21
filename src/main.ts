import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as CookieParser from 'cookie-parser';
import { main as seedDatabase } from 'prisma/seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.use(CookieParser());
  app.enableCors();

  await app.listen(3000);
  //await seedDatabase();
}
bootstrap();
