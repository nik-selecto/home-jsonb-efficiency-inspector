import { ConfigModule } from '@nestjs/config';
import { validateConfig } from './config.validation';

export const priorityEnvArr = ['.env', '.local.env', '.example.env'];

export const Config = ConfigModule.forRoot({
  envFilePath: priorityEnvArr,
  validate: validateConfig,
  isGlobal: true,
  cache: true,
});
