import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { generateMongoSchema } from '../../general/generate-mongo-schema.fn';
import { MongooseDocumentType } from '../../general/mongoose-document.type';
import { FullUserInterface } from './dto/full-user.interface';

@Schema(generateMongoSchema())
export class User implements FullUserInterface {
  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  _id: string | Types.ObjectId;
  createdAt: string;
  updatedAt: string;

  @Prop({
    required: true,
  })
  password: string;
}

export type UserDocument = User & MongooseDocumentType<User>;

export const UserSchema = SchemaFactory.createForClass(User);
