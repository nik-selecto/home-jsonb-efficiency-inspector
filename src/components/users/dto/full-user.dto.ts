import { FullUserInterface } from './full-user.interface';
import { Types } from 'mongoose';
import {
  IsAlphanumeric, IsArray, IsBoolean,
  IsDate,
  IsEmail,
  IsMongoId, IsString,
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

  @IsBoolean()
  hasRabbitDb: boolean;

  @IsArray()
  @IsString({ each: true })
  tables: string[];
}
