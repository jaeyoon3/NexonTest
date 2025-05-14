import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  await app.listen(4000);
  console.log(`🚀 Gateway Server is running on http://localhost:4000`);
}
bootstrap();