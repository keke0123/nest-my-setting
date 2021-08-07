import { Controller, Get, HttpStatus, Inject, LoggerService, Param, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config, Observable, of } from 'rxjs';
import { CustomLoggerService } from 'src/modules/logger/logger.module';
import { PROVIDE } from 'src/references';

import { ServiceException } from '../../utils/service-exception';

@Controller({ path: 'sample'})
export class SampleController {

  constructor(
    private readonly config: ConfigService,
    // private readonly logger: LoggerService,
    @Inject(PROVIDE.LOGGER) private readonly logger: CustomLoggerService,
  ) {}

  @Get()
  index(): Observable<any> {
    return of(['hello']);
  }

  @Get('/error')
  throwError(): Observable<any> {

    this.logger.info('test', {
      message: 'sample error controller',
      data: '',
    });

    throw new ServiceException({ message: 'service error' }, HttpStatus.INTERNAL_SERVER_ERROR);

    return of({ message: 'success', data: ''});
  }

  @Post('/validation/1/:type/:id')
  validation1(@Param('type') type: any): Observable<any> {
    this.logger.debug('type', type);
    this.logger.debug('type');
    this.logger.debug({type});
    // this.logger.info('params', params);
    return of({ message: 'success', data: '' });
  }

}
