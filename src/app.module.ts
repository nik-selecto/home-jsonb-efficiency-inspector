import { Module } from '@nestjs/common';
import { AppController } from './components/app/app.controller';
import { AppService } from './components/app/app.service';
import { BullModule } from '@nestjs/bull';
import { RabbitModule } from './components/rabbit/rabbit.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './components/users/users.module';
import { AuthModule } from './components/auth/auth.module';
import { Config } from './general/config.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectConfigType } from './general/config.type';

@Module({
  imports: [
    Config,
    BullModule.forRoot({}),
    RabbitModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<ProjectConfigType>) => ({
        uri: `mongodb://${config.get('MONGO_HOST')}:${config.get(
          'MONGO_PORT',
        )}/${config.get('MONGO_DB')}`,
      }),
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
