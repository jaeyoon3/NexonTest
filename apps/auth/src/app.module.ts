import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://my_mongodb:27017/auth-db'), // DB 연결
    AuthModule,
  ],
})
export class AppModule {}