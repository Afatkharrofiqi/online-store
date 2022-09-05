import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@model/product.entity';
import { AccountModule } from '@module/account/account.module';
import { AdminModule } from '@module/admin/admin.module';
import { AuthModule } from '@module/auth/auth.module';
import { CartModule } from '@module/cart/cart.module';
import { OrderModule } from '@module/order/order.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsService } from '@service/product/product.service';
import { ProductController } from '@controller/product/product.controller';

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
  providers: [AppService, ProductsService],
})
export class AppModule { }
