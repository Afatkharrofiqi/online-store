import {
  Controller,
  Get,
  Render,
  Req,
  Redirect,
  Param,
  Body,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Product } from '@model/product';
import { Item } from '@model/item';
import { Order } from '@model/order';
import { ProductService } from '@service/product/product';
import { UsersService } from '@service/user/user';
import { OrdersService } from '@service/order/order';

@Controller('/cart')
export class CartController {
  constructor(
    private readonly productService: ProductService,
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService,
  ) { }

  @Get('/')
  @Render('cart/index')
  async index(@Req() request: any) {
    let total = 0;
    let productsInCart: Product[] = null;
    const productsInSession = request.session.products;
    if (productsInSession) {
      productsInCart = await this.productService.findByIds(
        Object.keys(productsInSession),
      );
      total = Product.sumPricesByQuantities(productsInCart, productsInSession);
    }
    const viewData = [];
    viewData['title'] = 'Cart - Online Store';
    viewData['subtitle'] = 'Shopping Cart';
    viewData['total'] = total;
    viewData['productsInCart'] = productsInCart;
    return {
      viewData: viewData,
    };
  }

  @Post('/add/:id')
  @Redirect('/cart')
  add(@Param('id') id: number, @Body() body, @Req() request) {
    let productsInSession = request.session.products;
    if (!productsInSession) {
      productsInSession = {};
    }
    productsInSession[id] = body.quantity;
    request.session.products = productsInSession;
  }

  @Get('/delete')
  @Redirect('/cart/')
  delete(@Req() request) {
    request.session.products = null;
  }

  @Get('/purchase')
  async purchase(@Req() request: any, @Res() response: Response) {
    if (!request.session.user) {
      return response.redirect('/auth/login');
    }

    if (!request.session.products) {
      return response.redirect('/cart');
    }

    const user = await this.usersService.findOne(request.session.user.id);
    const productsInSession = request.session.products;
    const productsInCart = await this.productService.findByIds(
      Object.keys(productsInSession),
    );
    let total = 0;
    const items: Item[] = [];
    for (let i = 0; i < productsInCart.length; i++) {
      const quantity = productsInSession[productsInCart[i].getId()];
      const item = new Item();
      item.setQuantity(quantity);
      item.setPrice(productsInCart[i].getPrice());
      item.setProduct(productsInCart[i]);
      items.push(item);
      total = total + productsInCart[i].getPrice() * quantity;
    }

    const newOrder = new Order();
    newOrder.setTotal(total);
    newOrder.setItems(items);
    newOrder.setUser(user);

    const order = await this.ordersService.createOrUpdate(newOrder);
    const newBalance = user.getBalance() - total;
    await this.usersService.updateBalance(user.getId(), newBalance);
    request.session.products = null;

    const viewData = [];
    viewData['title'] = 'Purchase - Online Store';
    viewData['subtitle'] = 'Purchase Status';
    viewData['orderId'] = order.getId();
    return response.render('cart/purchase', { viewData: viewData });
  }
}
