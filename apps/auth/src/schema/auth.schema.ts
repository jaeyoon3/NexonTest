import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    name: string;

    @Prop()
    role: string;
    
    @Prop()
    successRequests: string[];

    @Prop({
    type: [
      {
        eventId: String,
        progress: Number,     
        conditionId: String,  
      },
    ],
    })
    eventProgress: {
        eventId: string;
        progress: number;
        conditionId: string;
    }[];
}

export const AuthSchema = SchemaFactory.createForClass(Auth);