import Redis from 'ioredis';
import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from '../config/env.config';

const redis = new Redis({
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT),
    // username: REDIS_USER,
    password: REDIS_PASSWORD,
});

redis.on('connect', () => {
    console.log('Redis connected');
});

redis.on('error', (err) => {
    console.error('Redis error', err);
});

export default redis;