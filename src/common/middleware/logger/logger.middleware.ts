import { LOGGER_TOKEN } from '@app/share/log/log.module';
import { Logger } from '@app/share/log/logger.service';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  @Inject(LOGGER_TOKEN)
  private Log: Logger;
  use(req: Request, res: Response, next: () => void) {
    const code = res.statusCode; // 响应状态码
    next();
    // 组装日志信息
    const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Status code: ${code}
    Parmas: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)} \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `;
    // 根据状态码，进行日志类型区分
    if (code >= 500) {
      this.Log.error(logFormat);
    } else if (code >= 400) {
      this.Log.warn(logFormat);
    } else {
      this.Log.access(logFormat);
      this.Log.log(logFormat);
    }
  }
}
