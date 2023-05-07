import mongoose from 'mongoose';
import { MONGO_URL } from './env.config';

const db = mongoose.createConnection(MONGO_URL, {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 0,
  autoIndex: true,
});

export default db;
