import { PG_CONNECTION } from './pg-connection.constant';
import { Pool } from 'pg';
import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import {priorityEnvArr} from "./config.module";

priorityEnvArr.forEach((env) => config({ path: env }));

const pgProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB,
    host: process.env.PG_HOST,
    port: +process.env.PG_PORT,
  }),
};

@Module({
  providers: [pgProvider],
  exports: [pgProvider],
})
export class PgModule {}
