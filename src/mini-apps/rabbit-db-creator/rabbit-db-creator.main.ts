import { NestFactory } from '@nestjs/core';
import { RabbitDbCreatorModule } from './rabbit-db-creator.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function miniBootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    RabbitDbCreatorModule,
    new FastifyAdapter(),
  );
  await app.listen(3001);
}

miniBootstrap().catch((error) => {
  console.error(error);
});
