import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../../utils/jwt.util';
import { MUser } from '../../models/interfaces/model.interface';
import DbModels from '../../config/db.models.config';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Could not authenticate request',
        error: 'Invalid or no authorization token provided.',
      });
    }

    token = token.substring(7);
    const decoded = (await verifyToken(token)) as MUser;

    const user = await DbModels.User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Could not authenticate request',
        error: 'Invalid or no authorization token provided.',
      });
    }

    req.user = user;
    next();
  } catch (error: any) {
    console.error('error', error);
    return res.status(500).json({
      success: false,
      message: 'Could not authenticate request',
      error: error.message!,
    });
  }
};

export const authenticateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Could not authenticate request',
        error: 'Invalid or no authorization token provided.',
      });
    }
    if (!user.isAdmin) {
      return res.status(401).json({
        success: false,
        message: 'Could not authenticate request',
        error: 'You are not authorized to perform this action.',
      });
    }
    next();
  } catch (error: any) {
    console.error('error', error);
    return res.status(500).json({
      success: false,
      message: 'Could not authenticate request',
      error: error.message!,
    });
  }
};
