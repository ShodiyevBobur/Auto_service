import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';
import { LoggerFactory } from './logger/factory';


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
  logger: LoggerFactory("AutoService")})
  const config = app.get(ConfigService);
  const PORT = config.get<number>('API_PORT') || 3030;

  const options = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());

  await app.listen(PORT);
  console.log(`Server is running on http://localhost:${PORT}`);
}
bootstrap();
