import { GlobalExceptionFilter } from './global-exception.filter';
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { ConfigService } from '@nestjs/config';
import { PROVIDE } from 'src/references';

describe('GlobalExceptionFilter', () => {

  let app: INestApplication;
  let config: ConfigService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .compile();
    
    app = module.createNestApplication();
    await app.init();
    config = app.get(ConfigService);
  })

  it('should be defined', () => {
    expect(new GlobalExceptionFilter(app.get(PROVIDE.LOGGER), config, app.get(PROVIDE.SLACK))).toBeDefined();
  });
});
