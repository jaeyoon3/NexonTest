import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { AppService } from './auth.service';
import { Auth } from './schema/auth.schema';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //회원가입
  @Post('/register')
  async createUser(@Body() authData: Auth): Promise<Auth> {
    return this.appService.create(authData);
  }

  //로그인
  @Post('/login')
  async login(@Body() loginData: { email: string; password: string }) {
    console.log("login api start")
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

  //이벤트 조건 진행
  @Put('/progressAuth')
  async progressAuth(@Body() progressData: {userId: string; eventId: string; conditionId: string}) {
    return this.appService.progress(progressData.userId, progressData.eventId, progressData.conditionId);
  }

  //보상요청 중복 확인
  @Get('/duplication/:userId/:eventId')
  async duplication(@Param('userId') userId: string, @Param('eventId') eventId: string): Promise<boolean | null> {
    return this.appService.duplication(userId,eventId);
  }

  //유저의 이벤트 진행상황 체크
  @Get('/getProgress/:userId/:eventId')
  async getUserProgress(@Param('userId') userId: string, @Param('eventId') eventId: string): Promise<number | null> {
    return this.appService.getUserProgress(userId,eventId);
  }

  //보상요청 성공
  @Put('/success/:userId/:eventId')
  async success(@Param('userId') userId: string, @Param('eventId') eventId: string) {
    return this.appService.success(userId,eventId);
  }

}