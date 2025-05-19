import { Controller, Get, Post, Put, Body, UseGuards } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './jwt/roles.guard';
import { Roles } from './jwt/roles.decorator';


@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  //Auth 
  //회원가입
  @Post('/auth/register')
  async Register(@Body() authData: any) {
    return await this.gatewayService.RegisterAuth(authData);
  }

  //로그인
  @Post('/auth/login')
  async Login(@Body() loginData: any) {
    const token = await this.gatewayService.LoginAuth(loginData);
    return { access_token: token };
  }

  //이벤트 진행
  @Put('/auth/progress')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async Progress(@Body() progressData: any) {
    return await this.gatewayService.ProgressAuth(progressData);
  }

  //Event
  //이벤트 등록
  @Post('/event/register')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('OPERATOR','ADMIN')
  async eventRegister(@Body() eventData: any) {
    return await this.gatewayService.RegisterEvent(eventData);
  }

  //이벤트 활성화, 비활성화
  @Put('/event/eventStatus')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('OPERATOR','ADMIN')
  async eventStatus(@Body('eventId') eventId: string) {
    return await this.gatewayService.EventStatus(eventId);
  }

  //이벤트 목록 확인
  @Get('/event/eventList')
  @UseGuards(AuthGuard('jwt'))
  async getEventList() {
    return await this.gatewayService.AllEventCheck(); 
  }

  //이벤트 상세 확인
  @Get('/event/eventDetail')
  @UseGuards(AuthGuard('jwt'))
  async getEventDetail(@Body('eventId') eventId: string) {
    return await this.gatewayService.OneEventCheck(eventId); 
  }

  //이벤트 조건 등록
  @Post('/event/condition')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('OPERATOR','ADMIN')
  async ConditionRegister(@Body() conditionData: any) {
    return await this.gatewayService.RegisterCondition(conditionData);
  }

  //이벤트 조건 확인
  @Get('/event/conditionCheck')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('OPERATOR','ADMIN')
  async conditionCheck(@Body('conditionId') conditionId: string) {
    return await this.gatewayService.ConditionCheck(conditionId);
  }

  //Event-reward
  //이벤트 보상 등록
  @Post('/event/gameItem')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('OPERATOR','ADMIN')
  async gameItemRegister(@Body() rewardData: any) {
    return await this.gatewayService.RegisterReward({ ...rewardData, type: 'game_item'});
  }

  @Post('/event/coin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('OPERATOR','ADMIN')
  async coinRegister(@Body() rewardData: any) {
    return await this.gatewayService.RegisterReward({ ...rewardData, type: 'coin'});
  }

  @Post('/event/EnhancementBook')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('OPERATOR','ADMIN')
  async bookRegister(@Body() rewardData: any) {
    return await this.gatewayService.RegisterReward({ ...rewardData, type: 'enhancement_book'});
  }

  //보상 목록 확인
  @Get('/event/rewardList')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('OPERATOR','ADMIN')
  async getRewardList() {
    return await this.gatewayService.AllRewardCheck(); 
  }

  //보상 상세 확인
  @Get('/event/rewardCheck')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('OPERATOR','ADMIN')
  async rewardCheck(@Body('rewardId') rewardId: string) {
    return await this.gatewayService.OneRewardCheck(rewardId);
  }

  //Event-rewardRequest
  //보상 요청 등록
  @Post('/event/rewardRequest')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async rewardRequest(@Body() rewardRequestData: any) {
    return await this.gatewayService.RewardRequest(rewardRequestData);
  }

  //보상 요청 목록 확인
  @Get('/event/requestList')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('OPERATOR','ADMIN','AUDITOR')
  async getRequestList() {
    return await this.gatewayService.RequestList(); 
  }

  //유저별 보상 요청 확인
  @Get('/event/CheckRequest')
  @UseGuards(AuthGuard('jwt'))
  async CheckRequest(@Body('userId') userId: string) {
    return await this.gatewayService.RequestCheck(userId); 
  }

}