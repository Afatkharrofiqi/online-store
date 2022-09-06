import {
  Controller,
  Get,
  Render,
  Post,
  Redirect,
  Body,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { User } from '@model/user';
import { UsersService } from '@service/user/user';
import { UserValidator } from '@validator/user';

@Controller('/auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) { }

  @Get('/register')
  @Render('auth/register')
  register() {
    const viewData = [];
    viewData['title'] = 'User Register - Online Store';
    viewData['subtitle'] = 'User Register';
    return {
      viewData: viewData,
    };
  }

  @Post('/store')
  async store(
    @Body() body: User,
    @Req() request: any,
    @Res() response: Response,
  ) {
    const toValidate: string[] = ['name', 'email', 'password'];
    const errors: string[] = UserValidator.validate(body, toValidate);
    if (errors.length > 0) {
      request.session.flashErrors = errors;
      return response.redirect('/auth/register');
    } else {
      const newUser = new User();
      newUser.setName(body.name);
      newUser.setPassword(body.password);
      newUser.setEmail(body.email);
      newUser.setRole('client');
      newUser.setBalance(1000);
      await this.usersService.createOrUpdate(newUser);
      return response.redirect('/auth/login');
    }
  }

  @Get('/login')
  @Render('auth/login')
  login() {
    const viewData = [];
    viewData['title'] = 'User Login - Online Store';
    viewData['subtitle'] = 'User Login';
    return {
      viewData: viewData,
    };
  }

  @Post('/connect')
  async connect(
    @Body() body: User,
    @Req() request: any,
    @Res() response: Response,
  ) {
    const email = body.email;
    const pass = body.password;
    const user = await this.usersService.login(email, pass);
    if (user) {
      request.session.user = {
        id: user.getId(),
        name: user.getName(),
        role: user.getRole(),
      };
      return response.redirect('/');
    } else {
      return response.redirect('/auth/login');
    }
  }

  @Get('/logout')
  @Redirect('/')
  logout(@Req() request: any) {
    request.session.user = null;
  }
}
