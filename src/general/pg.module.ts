import { PG_CONNECTION } from './pg-connection.constant';
import { Pool } from 'pg';
import { Module } from '@nestjs/common';

const pgProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
  }),
};

@Module({
  providers: [pgProvider],
  exports: [pgProvider],
})
export class PgModule {}
