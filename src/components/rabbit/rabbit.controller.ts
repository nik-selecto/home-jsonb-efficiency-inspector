import { Body, Controller, Post } from '@nestjs/common';
import { RabbitService } from './rabbit.service';

@Controller('rabbit')
export class RabbitController {
  constructor(private rabbitService: RabbitService) {}

  @Post()
  createRabbitDb(@Body() data: { tableName: string }) {
    return this.rabbitService.createRabbitDb(data);
  }
}
