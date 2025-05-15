import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schema/event.schema'
import { Reward, RewardDocument } from './schema/reward.schema'
import { RewardRequest, RewardRequestDocument } from './schema/rewardRequest.schema'

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Reward.name) private rewardModel: Model<RewardDocument>,
    @InjectModel(RewardRequest.name) private rewardRequestModel: Model<RewardRequestDocument>,
  ) {}

  async eventRegister(event: Event): Promise<Event> {
      const createdEvent = new this.eventModel(event);
      return createdEvent.save();
  }

  //인증관련 수정해야함
  async rewardRegister(reward: Reward): Promise<Reward> {
      const createdReward = new this.rewardModel(reward);
      return createdReward.save();
  }

  async rewardRequest(rewardRequest: RewardRequest): Promise<RewardRequest> {
      const RewardRequest = new this.rewardRequestModel(rewardRequest);
      return RewardRequest.save();
  }

  getHello(): string {
    return 'Hello from Event Server!';
  }
}
