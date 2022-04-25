import { Process, Processor } from '@nestjs/bull';
import { QueueEnum } from '../../general/queue.enum';
import { Inject } from '@nestjs/common';
import { PG_CONNECTION } from '../../general/pg-connection.constant';
import { Pool } from 'pg';
import { Job } from 'bull';

@Processor(QueueEnum.RABBIT_DB)
export class RabbitDbCreatorProcessor {
  constructor(@Inject(PG_CONNECTION) private pgPool: Pool) {}

  @Process()
  async createDb(job: Job<{ id: string }>) {
    console.log(job.data);
  }
}
