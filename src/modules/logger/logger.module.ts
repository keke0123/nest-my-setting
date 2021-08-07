import { Module, Injectable, LoggerService, LogLevel, Param } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import { Logger, transports, format } from 'winston';
import { PROVIDE } from 'src/references';
import { inspect } from 'util';

@Module({
  providers: [
    {
      provide: PROVIDE.LOGGER,
      useFactory: (config: ConfigService) => {
        return new CustomLoggerService(loggerFactory(config));
      },
      inject: [ConfigService]
    }
  ],
  exports: [PROVIDE.LOGGER],
  imports: [ConfigModule],
})
export class LoggerModule {}

@Injectable()
export class CustomLoggerService implements LoggerService {
  constructor(private readonly logger: Logger) {}

  log(message: any, context?: any) {
    if(typeof message == 'object') {
      return this.logger.log('', { context: { ...message, ...context }});
    }
    return this.logger.log(message, { context });
  }
  info(message: any, context?: any) {
    if(typeof message == 'object') {
      return this.logger.info('', { context: { ...message, ...context }});
    }
    return this.logger.info(message, { context });
  }
  error(message: any, context?: any) {
    if(typeof message == 'object') {
      return this.logger.error('', { context: { ...message, ...context }});
    }
    return this.logger.error(message, { context });
  }
  warn(message: any, context?: any) {
    if(typeof message == 'object') {
      return this.logger.warn('', { context: { ...message, ...context }});
    }
    return this.logger.warn(message, { context });
  }
  debug?(message: any, context?: any) {
    if(typeof message == 'object') {
      return this.logger.debug('', { context: { ...message, ...context }});
    }
    return this.logger.debug(message, { context });
  }
  verbose?(message: any, context?: any) {
    if(typeof message == 'object') {
      return this.logger.verbose('', { context: { ...message, ...context }});
    }
    return this.logger.verbose(message, { context });
  }
  // setLogLevels?(levels: LogLevel[]) {
  //   throw new Error('Method not implemented.');
  // }
}

export const loggerFactory = (config: ConfigService) => {
  return winston.createLogger({
    level: config.get('service.log.level'),
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.Console({
        format: format.combine(
          format.json(),
          format.timestamp(),
          format.colorize(),
          format.simple(),
          // pretty(config.get('service.env')),
        )
      })
    ],
  })
}

const pretty = (env: string) => {
  return format.printf((info) => {
    // console.log('info', info);
    // console.log(info[Symbol.for('message')]);
    // if(env == 'local') {
    //   // console.log(typeof info.message);
    //   // util.inspect(object, showHidden=false, depth=2, colorize=true);
    //   return `[${info.level}]:\x1b[36m${info.timestamp}\x1b[0m:[\x1b[33m${info.service}\x1b[0m]\n${inspect(info.message, false, 10, true)}`;
    // }
    return `[${info.level}]:\x1b[36m${info.timestamp}\x1b[0m:[\x1b[33m${info.service}\x1b[0m]${typeof info.message == 'object' ? '\n' : ':'}${info.message}` + `${info['0'] ? '\n' + inspect(info['0'], false, 5, true) : ''}`;
  })
}