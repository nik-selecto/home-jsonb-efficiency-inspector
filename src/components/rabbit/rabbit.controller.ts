import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import {JwtAccessGuard} from "../auth/guards/jwt-access.guard";

@Controller('rabbit')
@UseGuards(JwtAccessGuard)
export class RabbitController {
  constructor(private rabbitService: RabbitService) {}

  @Post()
  createRabbitDb(@Body() data: { tableName: string }) {
    return this.rabbitService.createRabbitDb(data);
  }
}
