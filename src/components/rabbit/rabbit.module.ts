import { Module } from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import { RabbitController } from './rabbit.controller';
import { BullModule } from '@nestjs/bull';
import { QueueEnum } from '../../general/queue.enum';

@Module({
  imports: [BullModule.registerQueue({ name: QueueEnum.RABBIT_DB })],
  controllers: [RabbitController],
  providers: [RabbitService],
})
export class RabbitModule {}
