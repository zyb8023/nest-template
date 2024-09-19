import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LOGGER_TOKEN } from './share/log/log.module';
import * as express from 'express';
import { TransformInterceptor } from './common/interceptor/transform/transform.interceptor';

// 设置全局变量，保存项目根目录

async function bootstrap() {
  global['appRoot'] = resolve(__dirname, '.');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  const serverConfig: any = configService.get('SERVICE_CONFIG');
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  // 监听所有的请求路由，并打印日志
  app.useLogger(app.get(LOGGER_TOKEN));
  await app.listen(serverConfig.port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
