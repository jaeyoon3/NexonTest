import { Controller, Get, Post, Put, Body, UseGuards, Req  } from '@nestjs/common';
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

  @Put('/auth/progress')
  async Progress(@Body() progressData: any) {
    return await this.gatewayService.ProgressAuth(progressData);
  }

  //Event
  @Post('/event/register')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('OPERATOR','ADMIN')
  async EventRegister(@Body() eventData: any) {
    return await this.gatewayService.RegisterEvent(eventData);
  }

  @Get('/event/eventList')
  @UseGuards(AuthGuard('jwt'))
  async getEventList() {
    return await this.gatewayService.AllEventCheck(); 
  }

  @Get('/event/eventDetail')
  @UseGuards(AuthGuard('jwt'))
  async getEventDetail(@Body('eventId') eventId: string) {
    return await this.gatewayService.OneEventCheck(eventId); 
  }

  @Post('/event/condition')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('OPERATOR','ADMIN')
  async ConditionRegister(@Body() conditionData: any) {
    return await this.gatewayService.RegisterCondition(conditionData);
  }

  @Get('/event/conditionCheck')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('OPERATOR','ADMIN')
  async conditionCheck(@Body('conditionId') conditionId: string) {
    return await this.gatewayService.ConditionCheck(conditionId);
  }

  //Event-reward
  @Post('/event/reward')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('OPERATOR','ADMIN')
  async RewardRegister(@Body() rewardData: any) {
    return await this.gatewayService.RegisterReward(rewardData);
  }

  @Get('/event/rewardList')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('OPERATOR','ADMIN')
  async getRewardList() {
    return await this.gatewayService.AllRewardCheck(); 
  }

  @Get('/event/rewardCheck')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('OPERATOR','ADMIN')
  async rewardCheck(@Body('rewardId') rewardId: string) {
    return await this.gatewayService.OneRewardCheck(rewardId);
  }

  //Event-rewardRequest
  @Post('/event/rewardRequest')
  async rewardRequest(@Body() rewardRequestData: any) {
    return await this.gatewayService.RewardRequest(rewardRequestData);
  }

  @Get('/admin/dashboard')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('USER')
  getAdminDashboard(@Req() req) {
    return `Hello Admin, this is your dashboard!`;
  }

}