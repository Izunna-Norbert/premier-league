import { Request, Response } from 'express';
import Joi from 'joi';
import { validate } from '../../utils/validation.util';
import UserUseCase from '../usecases/user.usecase';
import { IAdvancedFind } from '../interfaces/user.interface';

export default class UserController {
  private userUsecase: UserUseCase;
  constructor(userUsecase: UserUseCase) {
    this.userUsecase = userUsecase;
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });
      const payload = req.body;
      validate(schema, payload);
      const response = await this.userUsecase.createUser(payload);
      if (response.success) {
        return res.status(201).json({ success: true, message: response.message, data: response.data });
      }
      return res.status(400).json({ success: response.success, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message!, error: error.name! });
      }
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  createAdmin = async (req: Request, res: Response) => {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });
      const payload = req.body;
      validate(schema, payload);
      const response = await this.userUsecase.createAdmin(payload);
      if (response.success) {
        return res.status(201).json({ success: true, message: response.message, data: response.data });
      }
      return res.status(400).json({ success: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message!, error: error.name! });
      }
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  signIn = async (req: Request, res: Response) => {
    try {
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });
      const payload = req.body;
      validate(schema, payload);
      const response = await this.userUsecase.signIn(payload);
      if (response.success) {
        return res.status(200).json({ success: true, message: response.message, data: response.data });
      }
      return res.status(400).json({ success: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message!, error: error.name! });
      }
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Cannot fetch user', error: 'id is required' });
      }
      const response = await this.userUsecase.findOneById(id);
      if (response.success) {
        return res.status(200).json({ success: true, message: response.message, data: response.data });
      }
      return res.status(400).json({ success: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message!, error: error.name! });
      }
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  updateUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        isAdmin: Joi.boolean().optional(),
      });
      const payload = req.body;
      validate(schema, { ...payload, id });
      const response = await this.userUsecase.updateOneById(id, payload);
      if (response.success) {
        return res.status(200).json({ success: true, message: response.message, data: response.data });
      }
      return res.status(400).json({ success: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message!, error: error.name! });
      }
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  deleteUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      const payload = { id };
      validate(schema, payload);
      const response = await this.userUsecase.deleteOneById(id);
      if (response.success) {
        return res.status(200).json({ success: true, message: response.message, data: response.data });
      }
      return res.status(400).json({ success: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message!, error: error.name! });
      }
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const response = await this.userUsecase.findAll();
      if (response.success) {
        return res.status(200).json({ success: true, message: response.message, data: response.data });
      }
      return res.status(400).json({ success: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  advancedFind = async (req: Request, res: Response) => {
    try {
      const { query, limit, page, filter } = req.query;
      const schema = Joi.object({
        query: Joi.string().required(),
        limit: Joi.number().required(),
        page: Joi.number().required(),
        filter: Joi.string().optional().valid('users', 'teams', 'fixtures'),
      });

      validate(schema, { query, limit, page, filter });
      const payload: IAdvancedFind = {
        query: query as string,
        limit: parseInt(limit as string),
        page: parseInt(page as string),
        filter: filter as string,
      };
      console.log('query', payload);
      const response = await this.userUsecase.advancedFind(payload);
      if (response.success) {
        return res.status(200).json({ success: true, message: response.message, data: response.data });
      }
      return res.status(400).json({ success: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };
}
