import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardDocument = Reward & Document;

@Schema()
export class Reward {

    @Prop()
    name: string;

    @Prop()
    quantity: number;

    @Prop()
    eventName: string;

}

export const RewardSchema = SchemaFactory.createForClass(Reward);