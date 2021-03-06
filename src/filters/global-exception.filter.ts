import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomLoggerService } from 'src/modules/logger/logger.module';
import { PROVIDE } from 'src/references';
import { SlackService } from 'src/services/slack/slack.service';
import { ServiceException } from 'src/utils/service-exception';

const ErrorType = {
  400: 'BAD_REQUEST',
  401: 'UAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  410: 'GONE',
  426: 'UPGRADE_REQUIRED',
  429: 'TOO_MANY_REQUESTS',
  500: 'INTERNAL_ERROR',
  503: 'SERVICE_UNAVAILABLE',
};

@Catch(ServiceException)
export class GlobalExceptionFilter<T> implements ExceptionFilter {

  constructor(
    private readonly logger: CustomLoggerService,
    private readonly config: ConfigService, 
    private readonly slack: SlackService
  ) {};

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // 기본값
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "";
    let name = "INTERNAL_SERVER_ERROR";
    let stack;

    if(exception instanceof HttpException) {
      status = exception.getStatus();
      name = ErrorType[status] || 'INTERNAL_SERVER_ERROR';
      message = exception.message;
      stack = this.config.get('service.env') == 'local' ? exception.stack : undefined;
    }

    this.logger.error(`${name}`, {
      request: {
        url: request.url,
        headers: request.headers,
        params: request.params,
        query: request.query,
        body: request.body,
      },
      error: {
        status,
        name,
        message,
        stack,
      }
    });

    // 현재 주석처리
    // if(status > 499) {
    //   this.slack.log({ payload: {
    //     ERROR_NAME: name,
    //     ERROR_STATUS: status,
    //     ERROR_MESSAGE: message,
    //     ERROR_STACK: stack,
    //     URL: request.url,
    //     PARAMS: JSON.stringify(request.params),
    //     QUERY: JSON.stringify(request.query),
    //     BODY: JSON.stringify(request.body),
    //   }, type: 'error' })
    // }

    response.status(status).json({
      status,
      name,
      message,
      stack,
      now: new Date().toISOString(),
    });
  }
}