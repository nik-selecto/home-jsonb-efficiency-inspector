import { Document as MongooseDocument } from 'mongoose';

export type MongooseDocumentType<T extends Record<string, any>> = T &
  MongooseDocument;
