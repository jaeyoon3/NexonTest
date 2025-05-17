import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { JwtAuthModule } from './jwt/jwtauth.module';

@Module({
  imports: [HttpModule, JwtAuthModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}