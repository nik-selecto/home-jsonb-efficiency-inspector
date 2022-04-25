import { Module } from '@nestjs/common';
import { AppController } from './components/app/app.controller';
import { AppService } from './components/app/app.service';
import { BullModule } from '@nestjs/bull';
import { RabbitModule } from './components/rabbit/rabbit.module';

@Module({
  imports: [BullModule.forRoot({}), RabbitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
