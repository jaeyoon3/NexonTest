import { NestFactory } from '@nestjs/core';
import { EventModule } from './event.module';

async function bootstrap() {
  const app = await NestFactory.create(EventModule);
  await app.listen(4002);
  console.log(`🚀 Event Server is running on http://localhost:4002`);
}
bootstrap();