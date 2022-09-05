import {
  Controller,
  Get,
  Render,
  Post,
  Redirect,
  Body,
  UseInterceptors,
  UploadedFile,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { Response } from 'express';
import { Product } from '@model/product';
import { ProductValidator } from '@validator/product';
import { ProductsService } from '@service/product/product';

@Controller('/admin/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

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
  async store(
    @Body() body: Product,
    @UploadedFile() file: Express.Multer.File,
    @Req() request,
  ) {
    const toValidate: string[] = [
      'name',
      'description',
      'price',
      'imageCreate',
    ];
    const errors: string[] = ProductValidator.validate(body, file, toValidate);
    if (errors.length > 0) {
      if (file) {
        fs.unlinkSync(file.path);
      }
      request.session.flashErrors = errors;
    } else {
      const newProduct = new Product();
      newProduct.setName(body.name);
      newProduct.setDescription(body.description);
      newProduct.setPrice(body.price);
      newProduct.setImage(file.filename);
      await this.productsService.createOrUpdate(newProduct);
    }
  }

  @Post(':id')
  @Redirect('/admin/products')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Get('/:id')
  @Render('admin/products/edit')
  async edit(@Param('id') id: number) {
    const viewData = [];
    viewData['title'] = 'Admin Page - Edit Product - Online Store';
    viewData['product'] = await this.productsService.findOne(id);
    return {
      viewData: viewData,
    };
  }

  @Post('/:id/update')
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' }))
  async update(
    @Body() body: Product,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
    @Res() response: Response,
    @Req() request: any,
  ) {
    const toValidate: string[] = [
      'name',
      'description',
      'price',
      'imageCreate',
    ];
    const errors: string[] = ProductValidator.validate(body, file, toValidate);
    if (errors.length > 0) {
      if (file) {
        fs.unlinkSync(file.path);
      }
      request.session.flashErrors = errors;
      return response.redirect('/admin/product/' + id);
    } else {
      const product = await this.productsService.findOne(id);
      product.setName(body.name);
      product.setDescription(body.description);
      product.setPrice(body.price);
      if (file) {
        product.setImage(file.filename);
      }
      await this.productsService.createOrUpdate(product);
      return response.redirect('/admin/products/');
    }
  }
}
