import { AppModule } from '@module/app';
import { ConfigModule } from '@module/config';
import { DatabaseModule } from '@module/database';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AppModule
  ],
})
export class MainModule { }
