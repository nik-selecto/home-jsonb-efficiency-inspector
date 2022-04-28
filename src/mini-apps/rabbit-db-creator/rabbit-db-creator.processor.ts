import {Process, Processor} from '@nestjs/bull';
import {QueueEnum} from '../../general/queue.enum';
import {Inject, Logger} from '@nestjs/common';
import {PG_CONNECTION} from '../../general/pg-connection.constant';
import {Pool} from 'pg';
import {Job} from 'bull';
import {CreateDbProcessType} from "../../components/rabbit/types/create-db-process.type";
import {JOBS_MAPPER} from "../../general/jobs-mapper.constant";
import {UsersService} from "../../components/users/users.service";
import {Types} from "mongoose";


@Processor(QueueEnum.RABBIT_DB)
export class RabbitDbCreatorProcessor {
    private logger = new Logger(RabbitDbCreatorProcessor.name);

    constructor(
        private usersService: UsersService,
        @Inject(PG_CONNECTION)
        private pgPool: Pool,
    ) {
    }

    @Process(JOBS_MAPPER[QueueEnum.RABBIT_DB].create)
    async createDb(job: Job<CreateDbProcessType>) {
        const {userId} = job.data;
        const dbName = `rabbit_db_${userId}`;

        try {
            await this.pgPool.query(`--sql
                create database ${dbName};
            `);
        } catch (error) {
            this.logger.error(error);

            return;
        }


        await this.usersService.updateOne({_id: new Types.ObjectId(userId)}, {
            $set: {
                hasRabbitDb: true,
            },
        });
    }
}
