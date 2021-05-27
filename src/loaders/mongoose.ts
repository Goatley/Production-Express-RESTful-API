import mongoose from 'mongoose';
import { Db } from 'mongodb';

export default async (): Promise<Db> => {
  const mongooseConnection = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  return mongooseConnection.connection.db;
};
