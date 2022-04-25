import { FullUserInterface } from './full-user.interface';
import { Types } from 'mongoose';
import {
  IsAlphanumeric,
  IsDate,
  IsEmail,
  IsMongoId,
  Length,
} from 'class-validator';

export class FullUserDto implements FullUserInterface {
  @IsEmail()
  email: string;

  @IsMongoId()
  _id: string | Types.ObjectId;
  @IsDate()
  createdAt: string;

  @IsDate()
  updatedAt: string;

  @IsAlphanumeric()
  @Length(8, 32)
  password: string;
}
