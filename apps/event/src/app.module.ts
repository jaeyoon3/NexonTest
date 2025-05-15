import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from './event.module';

@Module({
  imports: [
    MongooseModule.forRoot('url'), // DB 연결
    EventModule,
  ],
})
export class AppModule {}