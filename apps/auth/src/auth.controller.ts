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

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}