import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { QueueEnum } from '../../general/queue.enum';
import { Queue } from 'bull';
import {CreateDbType} from "./types/create-db.type";
import {JOBS_MAPPER} from "../../general/jobs-mapper.constant";
import {CreateDbProcessType} from "./types/create-db-process.type";
import {v4} from "uuid";

@Injectable()
export class RabbitService {
  constructor(@InjectQueue(QueueEnum.RABBIT_DB) private rabitDbQueue: Queue) {}

  async createRabbitDb(data: CreateDbType) {
    const queueName = QueueEnum.RABBIT_DB;
    const jobName = JOBS_MAPPER[queueName].create;
    const jobUuid = v4();
    const payload: CreateDbProcessType = {
      ...data,
      jobName,
      queueName,
      jobUuid,
    };

    this.rabitDbQueue.add(JOBS_MAPPER[QueueEnum.RABBIT_DB].create, payload);

    return { jobUuid };
  }
}
