export type ProjectConfigType = {
  PG_HOST: string;
  PG_PORT: number;
  PG_USER: string;
  PG_PASS: string;
  PG_DB: string;
  MONGO_HOST: string;
  MONGO_PORT: number;
  MONGO_PASS: string;
  MONGO_USER: string;
  MONGO_DB: string;
  SALT_USER_PASS: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv
      extends Omit<ProjectConfigType, 'PG_PORT' | 'MONGO_PORT'> {
      PG_PORT: string;
      MONGO_PORT: string;
    }
  }
}
