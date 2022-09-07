import { Product } from '@model/product';
import { Controller, Get, Render, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from '@service/product/product';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  @Render('products/index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Products - Online Store';
    viewData['subtitle'] = 'List of Products';
    viewData['products'] = await this.productService.findAll();
    return {
      viewData,
    };
  }

  @Get('/:id')
  async show(@Param() param: Product, @Res() response: Response) {
    const product = await this.productService.findOne(param.id);
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
