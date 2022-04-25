import { FullUserInterface } from './full-user.interface';
import { Types } from 'mongoose';
import { IsDate, IsEmail, IsMongoId } from 'class-validator';

export class FullUserDto implements FullUserInterface {
  @IsEmail()
  email: string;

  @IsMongoId()
  _id: string | Types.ObjectId;
  @IsDate()
  createdAt: string;

  @IsDate()
  updatedAt: string;
}
