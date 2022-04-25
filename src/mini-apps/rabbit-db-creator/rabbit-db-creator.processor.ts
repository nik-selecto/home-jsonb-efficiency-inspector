import { Process, Processor } from '@nestjs/bull';
import { QueueEnum } from '../../general/queue.enum';
import { Inject } from '@nestjs/common';
import { PG_CONNECTION } from '../../general/pg-connection.constant';
import { Pool } from 'pg';
import { Job } from 'bull';
import {CreateDbProcessType} from "../../components/rabbit/types/create-db-process.type";
import {JOBS_MAPPER} from "../../general/jobs-mapper.constant";

@Processor(QueueEnum.RABBIT_DB)
export class RabbitDbCreatorProcessor {
  constructor(@Inject(PG_CONNECTION) private pgPool: Pool) {}

  @Process(JOBS_MAPPER[QueueEnum.RABBIT_DB].create)
  async createDb(job: Job<CreateDbProcessType>) {
    console.log(job.data);
  }
}
