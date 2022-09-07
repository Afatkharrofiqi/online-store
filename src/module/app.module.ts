import { Module } from "@nestjs/common";
import { AccountModule } from "./account/account.module";
import { AdminModule } from "./admin/admin.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CartModule } from "./cart/cart.module";
import { OrderModule } from "./order/order.module";

@Module({
  imports: [
    AdminModule,
    AuthModule,
    CartModule,
    OrderModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }