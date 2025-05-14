import { Controller, Get } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly appService: GatewayService) {}

  @Get('/auth/hello')
  async getAuthHello() {
    return await this.appService.getAuthHello();
  }

  @Get('/event/hello')
  async getEventHello() {
    return await this.appService.getEventHello();
  }
}