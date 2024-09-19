import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { env } from '@config/index';
import { DatabaseModule } from './share/database/db.module';
import { UserModule } from './apis/user/user.module';
import { LogModule } from './share/log/log.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptor/transform/transform.interceptor';
import { HttpExceptionFilter } from './common/filter/http-exception/http-exception.filter';
import { AllExceptionsFilter } from './common/filter/any-exception/any-exception.filter';
import { RedisModule } from './share/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [env], //接收一个函数
    }),
    DatabaseModule,
    LogModule,
    UserModule,
    RedisModule,
  ],
  // app.module中导入全局拦截器可以导入依赖
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
