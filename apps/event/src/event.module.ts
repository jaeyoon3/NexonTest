import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './schema/event.schema'
import { Reward, RewardSchema } from './schema/reward.schema'
import { RewardRequest, RewardRequestSchema } from './schema/rewardRequest.schema'
import { Condition, ConditionSchema } from './schema/condition.schema';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { HttpModule } from '@nestjs/axios';



@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot('mongodb://my_mongodb:27017/event-db'),
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Reward.name, schema: RewardSchema },
      { name: RewardRequest.name, schema: RewardRequestSchema },
      { name: Condition.name, schema: ConditionSchema },
    ]),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}