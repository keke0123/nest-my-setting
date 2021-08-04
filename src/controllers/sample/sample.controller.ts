import { Controller, Get } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Controller({ path: 'sample'})
export class SampleController {
  @Get()
  index(): Observable<any> {
    return of(['hello']);
  }
}
