import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './auth.controller';
import { AppService } from './auth.service';
import { Auth, AuthSchema} from './schema/auth.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AuthModule {}