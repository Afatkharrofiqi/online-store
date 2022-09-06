import { ProductController } from '@controller/product/product';
import { Product } from '@model/product';
import { AccountModule } from '@module/account/account';
import { AdminModule } from '@module/admin/admin';
import { AuthModule } from '@module/auth/auth';
import { CartModule } from '@module/cart/cart';
import { OrderModule } from '@module/order/order';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from '@service/product/product';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmAyncConfig } from '@config/typeorm';
import { getEnvPath } from '@helper/env';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: getEnvPath(), isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAyncConfig),
    TypeOrmModule.forFeature([Product]),
    AdminModule,
    AuthModule,
    CartModule,
    OrderModule,
    AccountModule,
  ],
  controllers: [AppController, ProductController],
  providers: [ProductsService, ConfigService],
})
export class AppModule {}
