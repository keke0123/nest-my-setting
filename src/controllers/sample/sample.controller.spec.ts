import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PROVIDE } from 'src/references';
import { SampleController } from './sample.controller';

const testSlack = () => null;

describe('SampleController', () => {
  let app: INestApplication;
  let controller: SampleController;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   controllers: [SampleController],
    // }).compile();
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      // .overrideProvider(PROVIDE.SLACK) // test 용 provider 로 오버라이드
      // .useValue(testSlack) // PROVIDE.SLACK 대신 사용할 값
      .compile();

    controller = module.get<SampleController>(SampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
