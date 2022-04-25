import {Controller, Post, UseGuards, Request, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import {LocalGuard} from "./guards/local.guard";
import {RefreshDto} from "./dto/refresh.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  public async refresh(@Body() data: RefreshDto) {
    console.log(data);
    return this.authService.refresh(data.refresh);
  }
}
