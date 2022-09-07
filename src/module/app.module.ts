import { Module } from '@nestjs/common';
import { AuthModule } from '@module/auth/auth';
import { AdminModule } from '@module/admin/admin';
import { CartModule } from '@module/cart/cart';
import { OrderModule } from '@module/order/order';
import { AccountModule } from '@module/account/account';
import { ProductModule } from '@module/product/product';
import { AppController } from '@controller/app';
import { AppService } from '@service/app';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    CartModule,
    OrderModule,
    AccountModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
