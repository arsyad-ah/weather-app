import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // sleep for 10s as buffer to let other containers run ok
  setTimeout(() => 1 * 10 * 1000);
  console.debug(process.env.BACKEND_PORT);
  await app.listen(process.env.BACKEND_PORT);
}
bootstrap();
