import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    const viewData = [];
    viewData['title'] = 'Home Page - Online Store';
    return {
      viewData: viewData,
    };
  }

  @Get('/about')
  @Render('about')
  about() {
    const viewData = [];
    viewData['description'] = 'This is an about page ...';
    viewData['author'] = 'Developed by: Achmad Fatkharrofiqi';
    viewData['subtitle'] = 'About us';
    viewData['title'] = 'About us - Online Store';
    return {
      viewData: viewData,
    };
  }
}
