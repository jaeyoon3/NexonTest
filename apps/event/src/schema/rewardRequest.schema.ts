import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardRequestDocument = RewardRequest & Document;

@Schema()
export class RewardRequest {

    @Prop()
    userId: string;

    @Prop()
    eventId: string;

    @Prop()
    status: boolean;
}

export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);