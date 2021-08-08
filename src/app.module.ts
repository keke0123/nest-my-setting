import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import configs from './configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { SampleController } from './controllers/sample/sample.controller';

import { ServiceException } from './utils/service-exception';
import { SlackService } from './services/slack/slack.service';

import { PROVIDE } from './references';
import { LoggerModule } from './modules/logger/logger.module';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ configs ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('mysql.host'),
          port: configService.get('mysql.port'),
          username: configService.get('mysql.username'),
          password: configService.get('mysql.password'),
          // autoLoadEntities: true,
          entities: ["dist/**/mysql/*.entity{.ts,.js}"],
          synchronize: configService.get('service.env') == 'local' ? true : false,
        }
      }
    }),
    LoggerModule,
    RedisModule,
  ],
  controllers: [AppController, SampleController],
  providers: [
    AppService,
    {
      provide: PROVIDE.SLACK,
      useFactory: (config: ConfigService) => {
        return new SlackService(config);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  onModuleInit() {
    this.logger.debug(`AppModule init`);
  }
}
