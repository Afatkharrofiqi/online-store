import { Product } from '@model/product';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from '@service/product/product';
import { AdminController } from './admin.controller';
import { ProductsController } from './product/product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [AdminController, ProductsController],
  providers: [ProductsService],
})
export class AdminModule {}
