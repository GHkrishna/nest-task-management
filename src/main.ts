import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { TransformInterceptor } from "./transform.interceptor";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  // Used to log
  // Context defined: Main Context
  const logger = new Logger("Main Context");
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;
  // Pipes defined globally to validate data according to DTOs
  app.useGlobalPipes(new ValidationPipe());
  // Defined a Custom transformer at global level global
  // This transforms the response to exclude the sensitive user data and only sends data received from other columns
  app.useGlobalInterceptors(new TransformInterceptor());
  // Interceptor, other middleware must be defined before app listens
  await app.listen(PORT);
  logger.verbose(`listenin on port:${PORT} \n\n http://localhost.com:${PORT}`);
}
bootstrap();
