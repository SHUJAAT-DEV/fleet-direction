import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { ExceptionHandler } from './common/exceptions/exception.handler';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmConfigService } from './common/typeorm/typeorm.service';
const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ApiModule,
  ],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: ExceptionHandler,
  }],
})
export class AppModule {
  constructor() {
    console.log('Root module');
  }
}
