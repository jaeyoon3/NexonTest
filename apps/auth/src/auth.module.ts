import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './auth.controller';
import { AppService } from './auth.service';
import { Auth, AuthSchema} from './schema/auth.schema'
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
      secret: 'CA6155E677628B49B3A12D15C71BC',
      signOptions: { expiresIn: '1h' },
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AuthModule {}