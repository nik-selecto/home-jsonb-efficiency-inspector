import {Controller, Post, UseGuards, Request} from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import {JwtAccessGuard} from "../auth/guards/jwt-access.guard";
import {JwtPayloadType} from "../auth/jwt-payload.type";

@Controller('rabbit')
@UseGuards(JwtAccessGuard)
export class RabbitController {
  constructor(private rabbitService: RabbitService) {}

  @Post()
  createRabbitDb(@Request() req: { user: JwtPayloadType }) {
    return this.rabbitService.createRabbitDb(req.user.id, req.user._id);
  }
}
