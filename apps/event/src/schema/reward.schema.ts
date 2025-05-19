import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardDocument = Reward & Document;

@Schema()
export class Reward {

    @Prop()
    type: string;

    @Prop()
    name: string;

    @Prop()
    quantity: number;

    @Prop()
    eventId: string;

}

export const RewardSchema = SchemaFactory.createForClass(Reward);