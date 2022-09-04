import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../models/order.entity';
import { OrdersService } from '../order/order.service';
import { AccountController } from './account.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [AccountController],
  providers: [OrdersService]
})
export class AccountModule { }