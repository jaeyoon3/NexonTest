import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop(String)
    condition: string;

    @Prop()
    status: boolean;

    @Prop([String])
    reward: string[];

    @Prop({ type: Date, required: true })
    startDate: Date;

    @Prop({ type: Date, required: true })
    endDate: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);