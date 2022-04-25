import {Body, Controller, Post, UseGuards, Request} from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import {JwtAccessGuard} from "../auth/guards/jwt-access.guard";
import {JwtPayloadType} from "../auth/jwt-payload.type";

@Controller('rabbit')
@UseGuards(JwtAccessGuard)
export class RabbitController {
  constructor(private rabbitService: RabbitService) {}

  @Post()
  createRabbitDb(@Body() data: { tableName: string }, @Request() req: { user: JwtPayloadType }) {
    const {  email, id } = req.user;
    return this.rabbitService.createRabbitDb({ ...data, userEmail: email, userId: id });
  }
}
