import { Controller, Get, Post,Body } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './schema/event.schema'
import { Reward } from './schema/reward.schema'
import { RewardRequest } from './schema/rewardRequest.schema'


@Controller()
export class EventController {
  constructor(private readonly appService: EventService) {}

  @Post('/eventRegist')
  async eventRegist(@Body() eventData: Event): Promise<Event> {
      return this.appService.eventRegister(eventData);
  }

  @Post('/rewardRegist')
  async rewardRegist(@Body() rewardData: Reward): Promise<Reward> {
      return this.appService.rewardRegister(rewardData);
  }


  @Post('/rewardRequest')
  async rewardRequest(@Body() rewardRequestData: RewardRequest): Promise<RewardRequest> {
      return this.appService.rewardRequest(rewardRequestData);
  }


  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}