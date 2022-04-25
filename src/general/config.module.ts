import { ConfigModule } from '@nestjs/config';
import { validateConfig } from './config.validation';

export const Config = ConfigModule.forRoot({
  envFilePath: ['.env', '.local.env', '.example.env'],
  validate: validateConfig,
  isGlobal: true,
  cache: true,
});
