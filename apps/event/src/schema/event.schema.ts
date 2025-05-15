import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    condition: string;

    @Prop()
    status: boolean;

    @Prop()
    reward: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);