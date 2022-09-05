import { Order } from '@model/order';
import { Product } from '@model/product';
import { User } from '@model/user';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from '@service/order/order';
import { ProductsService } from '@service/product/product';
import { UsersService } from '@service/user/user';
import { CartController } from './cart.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User, Order])],
  controllers: [CartController],
  providers: [ProductsService, UsersService, OrdersService],
})
export class CartModule {}
