import { Controller, Get, Render, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { Product } from '../models/product.entity';
import { ProductsService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) { }

  @Get('/')
  @Render('products/index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Products - Online Store';
    viewData['subtitle'] = 'List of Products';
    viewData['products'] = await this.productsService.findAll();
    return {
      viewData
    }
  }

  @Get('/:id')
  async show(@Param() param: Product, @Res() response: Response) {
    const product = await this.productsService.findOne(param.id);
    if (product === undefined) {
      return response.redirect('/products');
    }
    const viewData = [];
    viewData['title'] = product.name + '- Online Store';
    viewData['subtitle'] = product.name + '- Product Information';
    viewData['product'] = product;

    return response.render('products/show', { viewData: viewData });
  }
}
