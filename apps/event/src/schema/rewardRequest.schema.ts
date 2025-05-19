import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardRequestDocument = RewardRequest & Document;

@Schema()
export class RewardRequest {

    @Prop()
    userId: string;

    @Prop()
    eventId: string;

    //true는 성공, false는 실패
    @Prop()
    status: boolean;
}

export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);