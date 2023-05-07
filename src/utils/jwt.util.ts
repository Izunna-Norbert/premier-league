import jwt, { VerifyErrors } from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/env.config';

export const generateToken = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' });
};

export const verifyToken = (token: string): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET_KEY, (err: VerifyErrors | null, decoded: object | string | undefined) => {
      if (err) {
        return reject(err);
      }
      return resolve(decoded);
    });
  });
};
