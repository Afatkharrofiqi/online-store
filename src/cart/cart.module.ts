import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../models/order.entity';
import { Product } from '../models/product.entity';
import { User } from '../models/user.entity';
import { OrdersService } from '../order/order.service';
import { ProductsService } from '../product/product.service';
import { UsersService } from '../user/user.service';
import { CartController } from './cart.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, User, Order])
  ],
  controllers: [CartController],
  providers: [ProductsService, UsersService, OrdersService]

})
export class CartModule { }