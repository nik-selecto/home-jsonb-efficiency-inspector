import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { RabbitDbCreatorProcessor } from './rabbit-db-creator.processor';
import { PgModule } from '../../general/pg.module';
import { QueueEnum } from '../../general/queue.enum';

@Module({
  imports: [
    BullModule.forRoot({}),
    BullModule.registerQueue({ name: QueueEnum.RABBIT_DB }),
    PgModule,
  ],
  providers: [RabbitDbCreatorProcessor],
})
export class RabbitDbCreatorModule {}
