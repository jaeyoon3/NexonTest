import { Controller, Get, Post,Body,Param } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './schema/event.schema'
import { Reward } from './schema/reward.schema'
import { RewardRequest } from './schema/rewardRequest.schema'
import { Condition } from './schema/condition.schema'



@Controller()
export class EventController {
  constructor(private readonly appService: EventService) {}

  //Event
  @Post('/eventRegist')
  async eventRegist(@Body() eventData: Event): Promise<Event> {
      return this.appService.eventRegister(eventData);
  }

  @Get('/checkEventList')
  async checkEventList(): Promise<{ id: string; name: string }[]>  {
    return this.appService.checkEventList();
  }

  @Get('/checkOneEvent/:eventId')
  async checkOneEvent(@Param('eventId') eventId: string): Promise<Event | null>  {
    console.log("e1 is " + eventId);
    return this.appService.checkEventDetail(eventId);
  }

  @Post('/conditionRegist')
  async conditionRegist(@Body() conditionData: Condition): Promise<Condition> {
      return this.appService.conditionRegister(conditionData);
  }

  @Get('/checkCondition/:conditionId')
  async checkCondition(@Param('conditionId') conditionId: string): Promise<Condition | null>  {
    return this.appService.checkCondition(conditionId);
  }

  //Event-reward
  @Post('/rewardRegist')
  async rewardRegist(@Body() rewardData: Reward): Promise<Reward> {
      return this.appService.rewardRegister(rewardData);
  }

  @Get('/checkRewardList')
  async checkRewardList(): Promise<{ id: string; name: string }[]>  {
    return this.appService.checkRewardList();
  }

  @Get('/checkOneReward/:rewardId')
  async checkOneReward(@Param('rewardId') rewardId: string): Promise<Reward | null>  {
    return this.appService.checkRewardDetail(rewardId);
  }

  //Event-rewardRequest
  @Post('/rewardRequest')
  async rewardRequest(@Body() rewardRequestData: RewardRequest) {
      return this.appService.rewardRequest(rewardRequestData);
  }
  

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}