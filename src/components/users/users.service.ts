import { Module } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user';
import { Model } from 'mongoose';

@Module({})
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
}
