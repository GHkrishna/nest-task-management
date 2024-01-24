import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;
  await app.listen(PORT);
  console.log(`listenin on port:${PORT} \n\n http://localhost.com:${PORT}`);
}
bootstrap();
