import { Module } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Module({})
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(data: CreateUserDto) {
    return this.userModel.create(data);
  }
}
