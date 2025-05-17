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
  async eventRegister(event: Event): Promise<Event> {
    const createdEvent = new this.eventModel(event);
    return createdEvent.save();
  }
 
  async checkEventList(): Promise<{ id: string; name: string }[]> {
    const events = await this.eventModel.find({}, { name: 1 }).lean().exec();
    return events.map((event) => ({
      id: event._id.toString(),
      name: event.name,
    }));
  }

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

  async checkRewardList(): Promise<{ id: string; name: string }[]> {
    const rewards = await this.rewardModel.find({}, { name: 1 }).lean().exec();
    return rewards.map((reward) => ({
      id: reward._id.toString(),
      name: reward.name,
    }));
  }

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
  async rewardRequest(rewardRequest: RewardRequest){
    const createdrewardRequest = new this.rewardRequestModel(rewardRequest)
    await createdrewardRequest.save();
    const { userId, eventId } = rewardRequest;
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
      this.httpService.get(`http://localhost:4001/getProgress/${userId}/${eventId}`)
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
      console.log("success2")
      await firstValueFrom(
        this.httpService.put(`http://localhost:4001/success/${userId}/${eventId}`)
      );
    }
  }
  getHello(): string {
    return 'Hello from Event Server!';
  }
}
