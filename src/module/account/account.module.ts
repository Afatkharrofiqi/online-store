import { Order } from '@model/order';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from '@service/order/order';
import { AccountController } from '@controller/account/account';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [AccountController],
  providers: [OrdersService],
})
export class AccountModule {}
