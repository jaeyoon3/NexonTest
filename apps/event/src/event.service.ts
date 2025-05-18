import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event, EventDocument } from './schema/event.schema'
import { Reward, RewardDocument } from './schema/reward.schema'
import { RewardRequest, RewardRequestDocument } from './schema/rewardRequest.schema'
import { Condition, ConditionDocument } from './schema/condition.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Reward.name) private rewardModel: Model<RewardDocument>,
    @InjectModel(RewardRequest.name) private rewardRequestModel: Model<RewardRequestDocument>,
    @InjectModel(Condition.name) private conditionModel: Model<ConditionDocument>,
    private readonly httpService: HttpService,
  ) {}

  //Event
  //이벤트 등록
  async eventRegister(event: Event): Promise<Event> {
    const createdEvent = new this.eventModel(event);
    return createdEvent.save();
  }
 
  //이벤트 활성화
  async eventStatus(eventId: string) {

    if (!Types.ObjectId.isValid(eventId)) {
      throw new Error('Invalid event ID');
    }

    const updatedEvent = await this.eventModel.findByIdAndUpdate(
      eventId,
      { $set: { status: true } },
      { new: true } 
    ).lean().exec();

    if (!updatedEvent) {
      return "exist not event";
    }
  }


  //이벤트 목록 확인
  async checkEventList(): Promise<{ id: string; name: string }[]> {
    const events = await this.eventModel.find({}, { name: 1 }).lean().exec();
    return events.map((event) => ({
      id: event._id.toString(),
      name: event.name,
    }));
  }

  //이벤트 상세확인
  async checkEventDetail(eventId: string): Promise<Event | null> {
    console.log(eventId)
    if (!Types.ObjectId.isValid(eventId)) {
      throw new Error('Invalid event ID');
    }
    const event = await this.eventModel.findById(eventId).lean().exec();
    if (!event) {
      return null;
    }
    return event;
  }

  //이벤트 조건 등록
  async conditionRegister(condition: Condition): Promise<Condition> {
    console.log(condition);
    const createdCondition = new this.conditionModel(condition);
    await createdCondition.save();
    await this.eventModel.findByIdAndUpdate(
        condition.eventId,
        { condition: createdCondition._id }, // 원하는 필드로 값 넣기
        { new: true }
    );

    return createdCondition;
  }

  //이벤트 조건 확인
  async checkCondition(conditionId: string): Promise<Condition | null> {
    if (!Types.ObjectId.isValid(conditionId)) {
      throw new Error('Invalid event ID');
    }
    const condition= await this.conditionModel.findById(conditionId).lean().exec();
    if (!condition) {
      return null;
    }
    return condition;
  }

  //Event-reward
  //이벤트 보상 등록
  async rewardRegister(reward: Reward): Promise<Reward> {
    console.log(reward)
    const createdReward = new this.rewardModel(reward);
    await createdReward.save();
    await this.eventModel.findByIdAndUpdate(
        reward.eventId,
        { $push: { reward: createdReward._id } },
        { new: true }
    );
    return createdReward;
  }

  //보상 목록 확인
  async checkRewardList(): Promise<{ id: string; name: string }[]> {
    const rewards = await this.rewardModel.find({}, { name: 1 }).lean().exec();
    return rewards.map((reward) => ({
      id: reward._id.toString(),
      name: reward.name,
    }));
  }

  //보상 상세 확인
  async checkRewardDetail(rewardId: string): Promise<Reward | null> {
    if (!Types.ObjectId.isValid(rewardId)) {
      throw new Error('Invalid event ID');
    }
    const reward = await this.rewardModel.findById(rewardId).lean().exec();
    if (!reward) {
      return null;
    }
    return reward;
  }

  //Event-rewardRequest
  //보상요청 등록
  async rewardRequest(rewardRequest: RewardRequest){
    const { userId, eventId } = rewardRequest;
    const duplication = await firstValueFrom(
      this.httpService.get(`http://auth_service:4001/duplication/${userId}/${eventId}`)
    );
    const checkDuplication: boolean = duplication.data;
    if(checkDuplication){
      return "Duplication request"
    }

    const createdrewardRequest = new this.rewardRequestModel(rewardRequest)
    await createdrewardRequest.save();
    const event = await this.eventModel.findById(eventId).exec();
    if (!event) throw new Error('Event not found');
    const conditionId = event.condition;
    const condition= await this.conditionModel.findById(conditionId).lean().exec();
    if (!condition) {
      throw new Error('Condition not found');
    }
    const goal = condition.goal;
    console.log("goal is "+goal)
    const response = await firstValueFrom(
      this.httpService.get(`http://auth_service:4001/getProgress/${userId}/${eventId}`)
    );
    const userProgress: number = response.data; 
    
    if (userProgress >= goal) {
      const objectId = new Types.ObjectId(String(createdrewardRequest._id));
      console.log(Types.ObjectId.isValid(objectId))
      console.log(objectId)
      await this.rewardRequestModel.findByIdAndUpdate(
         objectId,
        { status: true },
        { new: true }
      );
      await firstValueFrom(
        this.httpService.put(`http://auth_service:4001/success/${userId}/${eventId}`)
      );

    }
    else{
      const objectId = new Types.ObjectId(String(createdrewardRequest._id));
      console.log(Types.ObjectId.isValid(objectId))
      console.log(objectId)
      await this.rewardRequestModel.findByIdAndUpdate(
         objectId,
        { status: false },
        { new: true }
      );
    }
  }

  //보상요청 목록 확인
  async RequestList(): Promise<RewardRequest[]> {
    return await this.rewardRequestModel.find().lean().exec();
  }

  //유저별 보상 요청 확인 
  async checkRequest(userId: string): Promise<RewardRequest[] | null> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid event ID');
    }
    
    const rewardRequests = await this.rewardRequestModel
    .find({ userId: userId })
    .lean()
    .exec();

    return rewardRequests.length > 0 ? rewardRequests : null;
  }
  
}
