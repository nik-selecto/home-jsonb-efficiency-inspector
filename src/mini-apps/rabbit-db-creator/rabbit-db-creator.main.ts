import { NestFactory } from '@nestjs/core';
import { RabbitDbCreatorModule } from './rabbit-db-creator.module';

async function miniBootstrap() {
  const app = await NestFactory.create(RabbitDbCreatorModule);
  await app.listen(3001);
}

miniBootstrap().catch((error) => {
  console.error(error);
});
