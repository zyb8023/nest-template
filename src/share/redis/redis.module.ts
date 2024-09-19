import { Module, DynamicModule, Global } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { RedisServices } from './redis.service';

export const REDIS_TOKEN = 'REDIS_TOKEN';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_TOKEN,
      useFactory: (configService: ConfigService) =>
        new Redis({
          host: configService.get<string>('REDIS_CONFIG.host'),
          port: configService.get<number>('REDIS_CONFIG.port'),
          password: configService.get<string>('REDIS_CONFIG.password'),
        }),
      inject: [ConfigService],
    },
    // 依赖项注入：明确使用 @Inject(REDIS_TOKEN) 注入 Redis 实例。
    // 提供者声明：在 RedisModule 中正确声明和提供 RedisServices 和 REDIS_TOKEN。
    // 依赖解析顺序：确保 RedisServices 在被实例化时能够正确获取到 Redis 实例。
    {
      provide: RedisServices,
      useFactory: (redisClient: Redis) => new RedisServices(redisClient),
      inject: [REDIS_TOKEN],
    },
  ],
  exports: [REDIS_TOKEN, RedisServices],
})
export class RedisModule {}
