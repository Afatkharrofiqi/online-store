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
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'online_store',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product]),
    AdminModule,
    AuthModule,
    CartModule,
    OrderModule,
    AccountModule,
  ],
  controllers: [AppController, ProductController],
  providers: [ProductsService],
})
export class AppModule {}
