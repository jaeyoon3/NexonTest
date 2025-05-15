import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb+srv://wodbs3191:dbslzhs3191@cluster0.rzmgvvs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}