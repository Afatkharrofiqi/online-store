import AppConfig from '@config/app';
import DatabaseConfig from '@config/typeorm';
import { getEnvPath } from '@helper/env';
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

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
