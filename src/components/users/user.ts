import { TimestampInterface } from '../../general/timestamp.interface';
import { MongoIdInterface } from '../../general/mongo-id.interface';
import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { generateMongoSchema } from '../../general/generate-mongo-schema.fn';
import { MongooseDocumentType } from '../../general/mongoose-document.type';

@Schema(generateMongoSchema())
export class User implements TimestampInterface, MongoIdInterface {
  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  _id: string | Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

export type UserDocument = User & MongooseDocumentType<User>;

export const UserSchema = SchemaFactory.createForClass(User);
