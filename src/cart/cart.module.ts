import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../models/product.entity';
import { ProductsService } from '../product/product.service';
import { CartController } from './cart.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product])
  ],
  controllers: [CartController],
  providers: [ProductsService]

})
export class CartModule { }