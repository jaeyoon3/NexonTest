import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
  constructor(private readonly httpService: HttpService) {}

  async RegisterAuth(authData: any) {
    await firstValueFrom(
      this.httpService.post('http://localhost:4001/register',authData),
    );
  }
  
  async LoginAuth(loginData: any) {
    const response = await firstValueFrom(
      this.httpService.post('http://localhost:4001/login',loginData),
    );
    return response.data;
  } 

  async RegisterEvent(eventData: any) {
    await firstValueFrom(
      this.httpService.post('http://localhost:4002/eventRegist',eventData),
    );
  }

  async RewardRequest(rewardRequestData: any) {
    await firstValueFrom(
      this.httpService.post('http://localhost:4002/rewardRequest',rewardRequestData),
    );
  }
}
