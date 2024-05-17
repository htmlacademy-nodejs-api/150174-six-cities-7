import { Mongoose } from 'mongoose';

interface DBClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  mongoose: Mongoose | null;
}

export type { DBClient };
