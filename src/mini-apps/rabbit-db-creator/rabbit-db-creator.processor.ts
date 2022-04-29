import {Process, Processor} from '@nestjs/bull';
import {QueueEnum} from '../../general/queue.enum';
import {Logger} from '@nestjs/common';
import {Client, ClientConfig, Pool} from 'pg';
import {Job} from 'bull';
import {CreateDbProcessType} from "../../components/rabbit/types/create-db-process.type";
import {JOBS_MAPPER} from "../../general/jobs-mapper.constant";
import {UsersService} from "../../components/users/users.service";
import {Types} from "mongoose";
import {CreateTableProcessType} from "../../components/rabbit/types/create-table-process.type";
import {ConfigService} from "@nestjs/config";
import {ProjectConfigType} from "../../general/config.type";


@Processor(QueueEnum.RABBIT_DB)
export class RabbitDbCreatorProcessor {
    private logger = new Logger(RabbitDbCreatorProcessor.name);

    private defaultPgOptions!: ClientConfig;

    private adminPgPool!: Pool;

    constructor(
        private usersService: UsersService,
        private configService: ConfigService<ProjectConfigType>,
    ) {
        this.defaultPgOptions = {
            password: this.configService.get('PG_PASS'),
            user: this.configService.get('PG_USER'),
            host: this.configService.get('PG_HOST'),
            database: this.configService.get('PG_DB'),
            port: this.configService.get('PG_PORT'),
        };
        this.adminPgPool = new Pool(this.defaultPgOptions);
    }

    @Process(JOBS_MAPPER[QueueEnum.RABBIT_DB].createDb)
    async createDb(job: Job<CreateDbProcessType>) {
        const {userId} = job.data;
        const dbName = RabbitDbCreatorProcessor.generateNameWithUserId(userId, 'db');
        const userName = dbName;

        // TODO wrap with transaction
        try {
            await this.adminPgPool.query(`--sql
                create role ${userName};
            `);
            await this.adminPgPool.query(`--sql
                alter role ${userName} with password 'rabbit';
            `);
            await this.adminPgPool.query(`--sql
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

    @Process(JOBS_MAPPER[QueueEnum.RABBIT_DB].createTable)
    async createAndFillTable(job: Job<CreateTableProcessType>) {
        const {userId, tableName, jColumnExamples} = job.data;
        // TODO create additional service where send these examples and mock table regarding for their templates
        this.logger.warn(jColumnExamples);
        const _tableName = RabbitDbCreatorProcessor.generateNameWithUserId(userId, { table: tableName });

        try {
            const pgClient = this.connectUserToOwnDb(userId);
            await pgClient.connect();
            await pgClient.query(`--sql
                create table if not exists ${_tableName}(
                    id bigserial primary key,
                    j_data jsonb not null
                );
            `);

            await pgClient.end();
        } catch (error) {
            this.logger.error(error);

            return;
        }
    }

    private static generateNameWithUserId(userId: string, type: 'db' | { table: string }) {
        return typeof type === 'string'
            ? `rabbit_${type}_${userId}`
            : `rabbit_table_${type.table}_${userId}`;
    }

    private connectUserToOwnDb(userId: string) {
        // TODO use client's credentials instead of admin's
        return new Client({
            ...this.defaultPgOptions,
            database: RabbitDbCreatorProcessor.generateNameWithUserId(userId, 'db'),
        });
    }
}
