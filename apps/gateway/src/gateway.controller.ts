import { Controller, Get, Post, Body, UseGuards, Req  } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './jwt/roles.guard';
import { Roles } from './jwt/roles.decorator';


@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  //Auth 
  @Post('/auth/register')
  async Register(@Body() authData: any) {
    return await this.gatewayService.RegisterAuth(authData);
  }

  @Post('/auth/login')
  async Login(@Body() loginData: any) {
    const token = await this.gatewayService.LoginAuth(loginData);
    return { access_token: token };
  }
  
  //이건 일단 나둬
  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req) {
    return req.user; // JwtStrategy에서 validate()로 반환한 값
  }

  //Event
  @Post('/event/register')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('OPERATOR','ADMIN')
  async EventRegister(@Body() eventData: any) {
    return await this.gatewayService.RegisterEvent(eventData);
  }

  @Post('/event/rewardRequest')
  async rewardRequest(@Body() rewardRequestData: any) {
    return await this.gatewayService.RegisterEvent(rewardRequestData);
  }

  @Get('/admin/dashboard')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  getAdminDashboard(@Req() req) {
    return `Hello Admin, this is your dashboard!`;
  }

}