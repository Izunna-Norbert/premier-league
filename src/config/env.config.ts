import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/express-ts-starter';
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret';
export const REDIS_HOST = process.env.REDIS_HOST || 'redis://localhost';
export const REDIS_PORT = process.env.REDIS_PORT || '6379';
export const REDIS_PASSWORD = process.env.PASSWORD || 'password';