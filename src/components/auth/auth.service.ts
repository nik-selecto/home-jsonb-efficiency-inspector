import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/user';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).lean();

    if (!(user && bcrypt.compareSync(password, user.password))) return null;

    const { password: pass, ..._user } = user;

    return _user;
  }
}
