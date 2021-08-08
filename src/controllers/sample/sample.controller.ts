import { Controller, Get, HttpStatus, Inject, LoggerService, Param, ParseIntPipe, Post, Query, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { config, Observable, of } from 'rxjs';
import { CustomLoggerService } from 'src/modules/logger/logger.module';
import { PROVIDE } from 'src/references';
import { SampleDefaultReturn } from 'src/types/dto/sample';

import { ServiceException } from '../../utils/service-exception';
import { Validation1Param } from './validation';
import { RedisService } from 'src/modules/redis/redis.module';
import { Request } from 'express';

@ApiTags('sample')
@Controller({ path: 'sample'})
export class SampleController {

  constructor(
    private readonly config: ConfigService,
    // private readonly logger: LoggerService,
    @Inject(PROVIDE.LOGGER) private readonly logger: CustomLoggerService,
    @Inject(PROVIDE.REDIS) private readonly redis: RedisService,
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
    this.logger.info('params', params);
    return of({ message: 'success', data: '' });
  }

  @Get('/redis/test')
  async redisTest(@Req() request: Request): Promise<Observable<any>> {

    const result = await this.redis.returnCacheData({
      cacheKey: 'sample:redisTest',
      func: () => 'test',
      arg: [],
      expireTime: 180,
    });

    this.logger.debug('result', result);

    
    return of({message: "success", data: {
      cached: result,
    }});
  }

}

