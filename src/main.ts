import { NestFactory } from '@nestjs/core';
import { mainModule } from 'process';
import { agent } from 'supertest';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();


