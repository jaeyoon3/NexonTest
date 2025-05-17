import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './auth.service';
import { Auth } from './schema/auth.schema';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/register')
  async createUser(@Body() authData: Auth): Promise<Auth> {
    return this.appService.create(authData);
  }

  @Post('/login')
  async login(@Body() loginData: { email: string; password: string }) {
    const token = await this.appService.login(
      loginData.email,
      loginData.password,
    );
    console.log(loginData.email,loginData.password)
    if (token) {
      return { access_token: token };
    } else {
      return { message: 'Invalid credentials' };
    }
  }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}