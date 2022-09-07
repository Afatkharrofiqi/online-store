import { getEnvPath } from '@helper/env';
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import AppConfig from './app.config';
import DatabaseConfig from './typeorm.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: getEnvPath(),
      isGlobal: true,
      load: [() => ({ app: AppConfig }), () => ({ database: DatabaseConfig })],
    }),
  ],
})
export class ConfigModule {}
