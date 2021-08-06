import { Controller, Get, HttpStatus } from '@nestjs/common';
import { Observable, of } from 'rxjs';

import { ServiceException } from '../../utils/service-exception';

@Controller({ path: 'sample'})
export class SampleController {
  @Get()
  index(): Observable<any> {
    return of(['hello']);
  }

  @Get('/error')
  throwError(): Observable<any> {

    throw new ServiceException({ message: 'service error' }, HttpStatus.INTERNAL_SERVER_ERROR);

    return of({ message: 'success', data: ''});
  }
}
