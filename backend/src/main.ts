import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`BACKEND_PORT: ${process.env.BACKEND_PORT}`);
  await app.listen(process.env.BACKEND_PORT);
}
bootstrap();
