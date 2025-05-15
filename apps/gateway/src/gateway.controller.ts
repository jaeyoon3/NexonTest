import { Controller, Get, Post, Body } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('/auth/register')
  async Register(@Body() authData: any) {
    return await this.gatewayService.RegisterAuth(authData);
  }

  @Post('/event/register')
  async EventRegister(@Body() eventData: any) {
    return await this.gatewayService.RegisterEvent(eventData);
  }

  @Post('/event/rewardRequest')
  async rewardRequest(@Body() rewardRequestData: any) {
    return await this.gatewayService.RegisterEvent(rewardRequestData);
  }
}