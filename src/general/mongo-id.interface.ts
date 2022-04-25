import { Types } from 'mongoose';

export interface MongoIdInterface {
  _id: string | Types.ObjectId;
}
