import {Injectable} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { QueueEnum } from '../../general/queue.enum';
import { Queue } from 'bull';
import {JOBS_MAPPER} from "../../general/jobs-mapper.constant";
import {CreateDbProcessType} from "./types/create-db-process.type";
import {Types} from "mongoose";
import {UsersService} from "../users/users.service";
import {ReadyOrJobIdType} from "../../general/ready-or-job-id.type.general";


@Injectable()
export class RabbitService {
  constructor(
      @InjectQueue(QueueEnum.RABBIT_DB)
      private rabbitDbQueue: Queue,
      private usersService: UsersService,
  ) {}

  async createRabbitDb(userId: string, _userId: Types.ObjectId): Promise<ReadyOrJobIdType> {
    const user = await this.usersService.findOne({ _id: _userId });

    if (user.hasRabbitDb) {
      return 'OK';
    }

    const queueName = QueueEnum.RABBIT_DB;
    const jobName = JOBS_MAPPER[QueueEnum.RABBIT_DB].create;
    const jobId = jobName + '__' + userId;
    const payload: CreateDbProcessType = {
      queueName,
      jobId,
      userId,
    };

    this.rabbitDbQueue.add(jobName, payload, { jobId });

    return { jobId };
  }
}
