import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConditionDocument = Condition & Document;

@Schema()
export class Condition {
  @Prop()
  eventId: string;          

  @Prop()
  type: string;             

  @Prop()
  goal: number;     

  @Prop()
  description: string;      
}

export const ConditionSchema = SchemaFactory.createForClass(Condition);