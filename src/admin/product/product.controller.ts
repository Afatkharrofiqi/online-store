import { Controller, Get, Render, Post, Redirect, Body } from '@nestjs/common';
import { Product } from '../../product/models/product.entity';
import { ProductsService } from '../../product/product.service';

@Controller('/admin/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get('/')
  @Render('admin/products/index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Admin Page - Admin - Online Store';
    viewData['products'] = await this.productsService.findAll();
    return {
      viewData: viewData,
    };
  }

  @Post('/store')
  @Redirect('/admin/products')
  async store(@Body() body) {
    const newProduct = new Product();
    newProduct.setName(body.name);
    newProduct.setDescription(body.description);
    newProduct.setPrice(body.price);
    newProduct.setImage('game.png');
    await this.productsService.createOrUpdate(newProduct);
  }
}