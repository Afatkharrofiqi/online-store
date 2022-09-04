import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './product/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './product/product.service';
import { Product } from './models/product.entity';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "online_store",
      entities: [
        "dist/**/*.entity{.ts,.js}"
      ],
      synchronize: true
    }),
    TypeOrmModule.forFeature([Product]),
    AdminModule,
    AuthModule,
    CartModule
  ],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductsService],
})
export class AppModule { }
