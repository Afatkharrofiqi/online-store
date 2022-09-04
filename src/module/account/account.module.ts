
import { Order } from '@model/order.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from '../order/order.service';
import { AccountController } from './account.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [AccountController],
  providers: [OrdersService],
})
export class AccountModule { }
