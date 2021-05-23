import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  const serverPort = Number(configService.get('SERVER_PORT'));
  console.log('serverPort ->', serverPort);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(serverPort);
}
bootstrap();
