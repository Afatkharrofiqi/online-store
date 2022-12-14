import { Product } from '@model/product';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from '@service/product/product';
import { AdminController } from '@controller/admin/admin';
import { ProductsController } from '@controller/admin/product/product';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [AdminController, ProductsController],
  providers: [ProductService],
})
export class AdminModule {}
