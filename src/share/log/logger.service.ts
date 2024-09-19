import { Inject, LoggerService } from '@nestjs/common';
import * as Path from 'path';
import * as StackTrace from 'stacktrace-js';
import { Log4js, LoggerLevel } from './log.config';

export class Logger implements LoggerService {
  private logger: Log4js.Logger;

  constructor(level: LoggerLevel) {
    this.logger = Log4js.getLogger();
    this.logger.level = level;
  }

  trace(...args) {
    this.logger.trace(Logger.getStackTrace(), ...args);
  }

  debug(...args) {
    this.logger.debug(Logger.getStackTrace(), ...args);
  }

  log(...args) {
    this.logger.info(Logger.getStackTrace(), ...args);
  }

  info(...args) {
    this.logger.info(Logger.getStackTrace(), ...args);
  }

  warn(...args) {
    this.logger.warn(Logger.getStackTrace(), ...args);
  }

  warning(...args) {
    this.logger.warn(Logger.getStackTrace(), ...args);
  }

  error(...args) {
    this.logger.error(Logger.getStackTrace(), ...args);
  }

  fatal(...args) {
    this.logger.fatal(Logger.getStackTrace(), ...args);
  }

  access(...args) {
    const loggerCustom = Log4js.getLogger('http');
    loggerCustom.info(Logger.getStackTrace(), ...args);
  }

  // 日志追踪，可以追溯到哪个文件、第几行第几列
  private static getStackTrace(deep: number = 2): string {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
    const stackInfo: StackTrace.StackFrame = stackList[deep];

    const lineNumber: number = stackInfo.lineNumber;
    const columnNumber: number = stackInfo.columnNumber;
    const fileName: string = stackInfo.fileName;
    const basename: string = Path.basename(fileName);
    return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
  }
}
