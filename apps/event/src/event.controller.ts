import { Controller, Get } from '@nestjs/common';
import { EventService } from './event.service';

@Controller()
export class EventController {
  constructor(private readonly appService: EventService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}