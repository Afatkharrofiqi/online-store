import { Order } from '@model/order';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from '@service/order/order';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrdersService],
})
export class OrderModule {}
