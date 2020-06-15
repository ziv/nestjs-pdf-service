import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(300, '0.0.0.0');
}
bootstrap().catch(e => console.log(e));
