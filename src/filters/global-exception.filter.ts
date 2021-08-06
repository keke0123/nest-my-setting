import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(GlobalExceptionFilter.name);

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
      stack = exception.stack;
    }

    this.logger.error(`${name}`, stack, JSON.stringify({
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
    }));

    response.status(status).json({
      status,
      name,
      message,
      stack,
      now: new Date().toISOString(),
    });
  }
}