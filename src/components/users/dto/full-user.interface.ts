import { TimestampInterface } from '../../../general/timestamp.interface';
import { MongoIdInterface } from '../../../general/mongo-id.interface';

export interface FullUserInterface
  extends TimestampInterface,
    MongoIdInterface {
  email: string;
}
