import { Controller, Get, Post,Put,Body,Param } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './schema/event.schema'
import { Reward } from './schema/reward.schema'
import { RewardRequest } from './schema/rewardRequest.schema'
import { Condition } from './schema/condition.schema'



@Controller()
export class EventController {
  constructor(private readonly appService: EventService) {}

  //Event
  //이벤트 등록
  @Post('/eventRegist')
  async eventRegist(@Body() eventData: Event): Promise<Event> {
      return this.appService.eventRegister(eventData);
  }

  //이벤트 활성화, 비활성화
  @Put('/eventStatus/:eventId')
  async eventStatus(@Param('eventId') eventId: string)  {
    return this.appService.eventStatus(eventId);
  }

  //이벤트 목록 확인(이벤트 id+ 이벤트 제목)
  @Get('/checkEventList')
  async checkEventList(): Promise<{ id: string; name: string }[]>  {
    return this.appService.checkEventList();
  }

  //이벤트 상세 확인
  @Get('/checkOneEvent/:eventId')
  async checkOneEvent(@Param('eventId') eventId: string): Promise<Event | null>  {
    console.log("e1 is " + eventId);
    return this.appService.checkEventDetail(eventId);
  }

  //이벤트 조건 등록
  @Post('/conditionRegist')
  async conditionRegist(@Body() conditionData: Condition): Promise<Condition> {
      return this.appService.conditionRegister(conditionData);
  }

  //이벤트 조건 확인
  @Get('/checkCondition/:conditionId')
  async checkCondition(@Param('conditionId') conditionId: string): Promise<Condition | null>  {
    return this.appService.checkCondition(conditionId);
  }

  //Event-reward
  //이벤트 보상 등록
  @Post('/rewardRegist')
  async rewardRegist(@Body() rewardData: Reward): Promise<Reward> {
      return this.appService.rewardRegister(rewardData);
  }

  //보상 리스트 확인
  @Get('/checkRewardList')
  async checkRewardList(): Promise<{ id: string; name: string }[]>  {
    return this.appService.checkRewardList();
  }

  //보상 상세 확인
  @Get('/checkOneReward/:rewardId')
  async checkOneReward(@Param('rewardId') rewardId: string): Promise<Reward | null>  {
    return this.appService.checkRewardDetail(rewardId);
  }

  //Event-rewardRequest
  //보상 요청 등록
  @Post('/rewardRequest')
  async rewardRequest(@Body() rewardRequestData: RewardRequest) {
      return this.appService.rewardRequest(rewardRequestData);
  }

  //보상요청 목록
  @Get('/requestList')
  async RequestList(): Promise<RewardRequest[]>  {
    return this.appService.RequestList();
  }

  //유저의 보상요청 확인인
  @Get('/checkRequest/:userId')
  async checkRequest(@Param('userId') userId: string): Promise<RewardRequest[] | null>  {
    return this.appService.checkRequest(userId);
  }

  
}