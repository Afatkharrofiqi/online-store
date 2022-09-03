import { Controller, Get, Render } from '@nestjs/common';
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

    console.log({ data: viewData['products'][0] });

    return {
      viewData: viewData,
    };
  }
}