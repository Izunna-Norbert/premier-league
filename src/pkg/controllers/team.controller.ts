import { Request, Response } from 'express';
import Joi from 'joi';
import { validate } from '../../utils/validation.util';
import TeamUseCase from '../usecases/team.usecase';

export default class TeamController {
  private teamUsecase: TeamUseCase;
  constructor(teamUsecase: TeamUseCase) {
    this.teamUsecase = teamUsecase;
  }

  create = async (req: Request, res: Response) => {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
      });
      let payload = req.body;
      validate(schema, payload);
      payload = { ...payload, createdBy: req.user.id };
      const response = await this.teamUsecase.create(payload);
      if (response.success) {
        return res.status(201).json({ succes: true, message: response.message, data: response.data });
      }
      return res.status(400).json({ succes: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message!, error: error.name! });
      }
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  getTeamById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      const payload = { id };
      validate(schema, payload);

      const response = await this.teamUsecase.findOneById(id);
      if (response.success) {
        return res.status(200).json({ succes: true, message: response.message, data: response.data });
      }
      return res.status(400).json({ succes: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message!, error: error.name! });
      }
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  updateTeamById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string(),
        description: Joi.string(),
      });

      validate(schema, { id, ...req.body });
      const payload = { ...req.body, updatedBy: req.user.id };
      const response = await this.teamUsecase.updateOneById(id, payload);
      if (response.success) {
        return res.status(200).json({ succes: true, message: response.message, data: response.data });
      }
      return res.status(400).json({ succes: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message!, error: error.name! });
      }
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  searchTeams = async (req: Request, res: Response) => {
    try {
      const { name } = req.query;
      const schema = Joi.object({
        name: Joi.string().required(),
      });
      const payload = { name };
      validate(schema, payload);
      const response = await this.teamUsecase.searchTeamsByName(name as string);
      if (response.success) {
        return res.status(200).json({ succes: true, message: response.message, data: response.data });
      }
      return res.status(400).json({ succes: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message!, error: error.name! });
      }
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  deleteTeamById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      const payload = { id };
      validate(schema, payload);
      const response = await this.teamUsecase.deleteOneById(id);
      if (response.success) {
        return res.status(200).json({ succes: true, message: response.message });
      }
      return res.status(400).json({ succes: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message!, error: error.name! });
      }
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const response = await this.teamUsecase.findAll();
      if (response.success) {
        return res.status(200).json({ succes: true, message: response.message, data: response.data });
      }
      return res.status(400).json({ succes: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message!, error: error.name! });
      }
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };
}
