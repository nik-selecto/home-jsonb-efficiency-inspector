import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({})
export class UsersController {
  constructor(private usersService: UsersService) {}
}
