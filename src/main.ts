import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

import config from './configs';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.get('mylogger');
  app.useGlobalFilters(new GlobalExceptionFilter(app.get(ConfigService)));
  await app.listen(3000);
}
bootstrap();
