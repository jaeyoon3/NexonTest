import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
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

  @Put('/progressAuth')
  async progressAuth(@Body() progressData: {userId: string; eventId: string; conditionId: string}) {
    return this.appService.progress(progressData.userId, progressData.eventId, progressData.conditionId);
  }

  @Get('/duplication/:userId/:eventId')
  async duplication(@Param('userId') userId: string, @Param('eventId') eventId: string): Promise<boolean | null> {
    return this.appService.duplication(userId,eventId);
  }

  @Get('/getProgress/:userId/:eventId')
  async getUserProgress(@Param('userId') userId: string, @Param('eventId') eventId: string): Promise<number | null> {
    return this.appService.getUserProgress(userId,eventId);
  }

  @Put('/success/:userId/:eventId')
  async success(@Param('userId') userId: string, @Param('eventId') eventId: string) {
    return this.appService.success(userId,eventId);
  }

  @Get('/hello')
    getHello(): string {
    return this.appService.getHello();
  }
}