import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

import config from './configs';
import { ConfigService } from '@nestjs/config';

import { PROVIDE } from './references';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(PROVIDE.LOGGER));
  app.useGlobalFilters(new GlobalExceptionFilter(app.get(PROVIDE.LOGGER), app.get(ConfigService), app.get(PROVIDE.SLACK)));
  await app.listen(3000);
}
bootstrap();
