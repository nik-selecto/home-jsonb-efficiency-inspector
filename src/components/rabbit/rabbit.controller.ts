import {Controller, Post, UseGuards, Request, Body, Logger} from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import {JwtAccessGuard} from "../auth/guards/jwt-access.guard";
import {JwtPayloadType} from "../auth/jwt-payload.type";
import {CreateTableReqDto} from "./dto/req/create-table.req.dto";
import {Types} from "mongoose";

@Controller('rabbit')
@UseGuards(JwtAccessGuard)
export class RabbitController {
  private log = new Logger(RabbitController.name);

  constructor(private rabbitService: RabbitService) {}

  @Post()
  createRabbitDb(@Request() req: { user: JwtPayloadType }) {
    return this.rabbitService.createRabbitDb(req.user.id, req.user._id);
  }

  @Post('table')
  createTable(@Body() data: CreateTableReqDto, @Request() req: { id: string, _id: Types.ObjectId }) {

  }
}
