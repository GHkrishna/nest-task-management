import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main Context');
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(PORT);
  logger.verbose(`listenin on port:${PORT} \n\n http://localhost.com:${PORT}`);
}
bootstrap();
