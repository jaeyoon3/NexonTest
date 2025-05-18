import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
  constructor(private readonly httpService: HttpService) {}

  //Auth
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

  async ProgressAuth(progressData: any) {
    await firstValueFrom(
      this.httpService.put('http://localhost:4001/progressAuth',progressData),
    );
  }

  //Event
  async RegisterEvent(eventData: any) {
    await firstValueFrom(
      this.httpService.post('http://localhost:4002/eventRegist',eventData),
    );
  }

  async AllEventCheck() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:4002/checkEventList'),
    );
    return response.data;
  } 

  async OneEventCheck(eventId: string) {
    console.log("event id is this " + eventId);
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:4002/checkOneEvent/${eventId}`),
    );
    return response.data;
  }

  async RegisterCondition(conditionData: any) {
    await firstValueFrom(
      this.httpService.post('http://localhost:4002/conditionRegist',conditionData),
    );
  }

  async ConditionCheck(conditionId: string) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:4002/checkCondition/${conditionId}`),
    );
    return response.data;
  }

  //Event-reward
  async RegisterReward(rewardData: any) {
    await firstValueFrom(
      this.httpService.post('http://localhost:4002/rewardRegist',rewardData),
    );
  }

  async AllRewardCheck() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:4002/checkRewardList'),
    );
    return response.data;
  } 

  async OneRewardCheck(rewardId: string) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:4002/checkOneReward/${rewardId}`),
    );
    return response.data;
  }

  //Event-rewardRequest
  async RewardRequest(rewardRequestData: any) {
    await firstValueFrom(
      this.httpService.post('http://localhost:4002/rewardRequest',rewardRequestData),
    );
  }

  async RequestList() {
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:4002/requestList'),
    );
    return response.data;
  } 

  async RequestCheck(userId: string) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:4002/checkRequest/${userId}`),
    );
    return response.data;
  }
}
