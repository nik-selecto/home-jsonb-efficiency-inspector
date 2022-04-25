import { Module } from '@nestjs/common';
import { AppController } from './components/app/app.controller';
import { AppService } from './components/app/app.service';
import { BullModule } from '@nestjs/bull';
import { RabbitModule } from './components/rabbit/rabbit.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './components/users/users.module';

@Module({
  imports: [
    BullModule.forRoot({}),
    RabbitModule,
    MongooseModule.forRoot('mongodb://localhost:27017'),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
