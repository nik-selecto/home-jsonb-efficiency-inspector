import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { QueueEnum } from '../../general/queue.enum';
import { Queue } from 'bull';

@Injectable()
export class RabbitService {
  constructor(@InjectQueue(QueueEnum.RABBIT_DB) private rabitDbQueue: Queue) {}

  async createRabbitDb(data: { tableName: string }) {
    const id = Math.random().toString();
    this.rabitDbQueue.add({ ...data, id });

    return id;
  }
}
