import { Controller, Get, HttpStatus, Inject, LoggerService, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { config, Observable, of } from 'rxjs';
import { CustomLoggerService } from 'src/modules/logger/logger.module';
import { PROVIDE } from 'src/references';
import { SampleDefaultReturn } from 'src/types/dto/sample';

import { ServiceException } from '../../utils/service-exception';
import { Validation1Param } from './validation';

@ApiTags('sample')
@Controller({ path: 'sample'})
export class SampleController {

  constructor(
    private readonly config: ConfigService,
    // private readonly logger: LoggerService,
    @Inject(PROVIDE.LOGGER) private readonly logger: CustomLoggerService,
  ) {}


  @Get()
  @ApiResponse({
    status: 200,
    description: 'sample default return',
    type: SampleDefaultReturn,
  })
  @ApiResponse({
    status: 400,
    description: 'BAD_REQUEST',
    // type: SampleDefaultReturn,
  })
  index(): Observable<SampleDefaultReturn> {
    return of({message: "success", data: ""});
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
  validation1(
    @Param() params: Validation1Param,
    // @Param('id', ParseIntPipe) id: number,
    // @Query()
  ): Observable<any> {
    console.log('params', params);
    return of({ message: 'success', data: '' });
  }

}

