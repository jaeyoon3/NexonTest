import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
  constructor(private readonly httpService: HttpService) {}

  //Auth
  //회원가입
  async RegisterAuth(authData: any) {
    await firstValueFrom(
      this.httpService.post('http://auth_service:4001/register',authData),
    );
  }
  
  //로그인
  async LoginAuth(loginData: any) {
    console.log("login api start")
    const response = await firstValueFrom(
      this.httpService.post('http://auth_service:4001/login',loginData),
    );
    return response.data;
  } 

  //조건 진행
  async ProgressAuth(progressData: any) {
    await firstValueFrom(
      this.httpService.put('http://auth_service:4001/progressAuth',progressData),
    );
  }

  //Event
  //이벤트 등록
  async RegisterEvent(eventData: any) {
    await firstValueFrom(
      this.httpService.post('http://event_service:4002/eventRegist',eventData),
    );
  }

  //이벤트 활성화 비활성화
  async EventStatus(eventId: string) {
    await firstValueFrom(
      this.httpService.put(`http://event_service:4002/eventStatus/${eventId}`),
    );
  }

  //이벤트 리스트
  async AllEventCheck() {
    const response = await firstValueFrom(
      this.httpService.get('http://event_service:4002/checkEventList'),
    );
    return response.data;
  } 

  //이벤트 상세 확인
  async OneEventCheck(eventId: string) {
    console.log("event id is this " + eventId);
    const response = await firstValueFrom(
      this.httpService.get(`http://event_service:4002/checkOneEvent/${eventId}`),
    );
    return response.data;
  }

  //이벤트 조건 등록
  async RegisterCondition(conditionData: any) {
    await firstValueFrom(
      this.httpService.post('http://event_service:4002/conditionRegist',conditionData),
    );
  }

  //조건 상세 확인
  async ConditionCheck(conditionId: string) {
    const response = await firstValueFrom(
      this.httpService.get(`http://event_service:4002/checkCondition/${conditionId}`),
    );
    return response.data;
  }

  //Event-reward
  //보상 등록
  async RegisterReward(rewardData: any) {
    await firstValueFrom(
      this.httpService.post('http://event_service:4002/rewardRegist',rewardData),
    );
  }

  //보상 목록
  async AllRewardCheck() {
    const response = await firstValueFrom(
      this.httpService.get('http://event_service:4002/checkRewardList'),
    );
    return response.data;
  } 

  //보상 상세 확인
  async OneRewardCheck(rewardId: string) {
    const response = await firstValueFrom(
      this.httpService.get(`http://event_service:4002/checkOneReward/${rewardId}`),
    );
    return response.data;
  }

  //Event-rewardRequest
  //보상 요청 등록
  async RewardRequest(rewardRequestData: any) {
    await firstValueFrom(
      this.httpService.post('http://event_service:4002/rewardRequest',rewardRequestData),
    );
  }

  //보상 요청 리스트
  async RequestList() {
    const response = await firstValueFrom(
      this.httpService.get('http://event_service:4002/requestList'),
    );
    return response.data;
  } 

  //유저별 보상 요청 확인
  async RequestCheck(userId: string) {
    const response = await firstValueFrom(
      this.httpService.get(`http://event_service:4002/checkRequest/${userId}`),
    );
    return response.data;
  }
}
