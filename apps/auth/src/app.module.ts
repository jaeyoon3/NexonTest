import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth.module';
import * as dotenv from 'dotenv';

dotenv.config(); 

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('MONGODB_URI 환경 변수가 설정되지 않았습니다.');
}

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri), // DB 연결
    AuthModule,
  ],
})
export class AppModule {}