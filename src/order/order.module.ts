import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../models/order.entity';
import { OrdersService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order])
  ],
  providers: [OrdersService]
})
export class OrderModule { }