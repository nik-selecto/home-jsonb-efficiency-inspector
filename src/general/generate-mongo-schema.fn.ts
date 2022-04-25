import { SchemaOptions } from '@nestjs/mongoose';

export function generateMongoSchema(
  data: Partial<SchemaOptions> = {},
): SchemaOptions {
  return { timestamps: true, versionKey: false, ...data };
}
