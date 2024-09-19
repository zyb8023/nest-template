import { Global, Module } from '@nestjs/common';
import { Logger } from './logger.service';
import { ConfigService } from '@nestjs/config';

export const LOGGER_TOKEN = 'LOGGER_TOKEN';

@Global()
@Module({
  providers: [
    {
      provide: LOGGER_TOKEN,
      useFactory: (configService: ConfigService) => new Logger(configService.get('LOG_CONFIG.level')),
      inject: [ConfigService],
    },
  ],
  exports: [LOGGER_TOKEN],
})
export class LogModule {}
