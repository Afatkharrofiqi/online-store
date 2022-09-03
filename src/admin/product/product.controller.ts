import { Controller, Get, Render, Post, Redirect, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' }))
  @Redirect('/admin/products')
  async store(@Body() body: Product, @UploadedFile() file: Express.Multer.File) {
    const newProduct = new Product();
    newProduct.setName(body.name);
    newProduct.setDescription(body.description);
    newProduct.setPrice(body.price);
    newProduct.setImage(file.filename);
    await this.productsService.createOrUpdate(newProduct);
  }
}