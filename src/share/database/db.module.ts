import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

const entitiesPaths = [join(__dirname, '../../', '**', '*.entity.{ts,js}')];

@Module({
  imports: [
    // 使用异步配置来加载 MySQL 配置
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 确保加载配置模块
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_CONFIG.host'),
        port: configService.get<number>('DATABASE_CONFIG.port'),
        username: configService.get<string>('DATABASE_CONFIG.username'),
        password: configService.get<string>('DATABASE_CONFIG.password'),
        database: configService.get<string>('DATABASE_CONFIG.database'),
        autoLoadEntities: configService.get<boolean>('DATABASE_CONFIG.autoLoadEntities'),
        connectorPackage: configService.get<'mysql' | 'mysql2'>('DATABASE_CONFIG.connectorPackage'),
        synchronize: !!configService.get<boolean | undefined>('DATABASE_CONFIG.synchronize'),
        poolSize: configService.get<number>('DATABASE_CONFIG.poolSize'),
        charset: configService.get<string>('DATABASE_CONFIG.charset'),
        entities: entitiesPaths,
        // logging: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
