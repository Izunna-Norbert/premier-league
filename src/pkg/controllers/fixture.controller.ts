import { Request, Response } from 'express';
import Joi from 'joi';
import { validate } from '../../utils/validation.util';
import FixtureUseCase from '../usecases/fixture.usecase';
import { ICreateFixture } from '../interfaces/fixture.interface';

export default class FixtureController {
  private fixtureUseCase: FixtureUseCase;
  constructor(fixtureUseCase: FixtureUseCase) {
    this.fixtureUseCase = fixtureUseCase;
  }

  createFixture = async (req: Request, res: Response) => {
    try {
      const schema = Joi.object({
        homeTeam: Joi.string().required(),
        awayTeam: Joi.string().required(),
        date: Joi.date().required(),
      });
      validate(schema, { ...req.body });
      const payload: ICreateFixture = { createdBy: req.user.id, startDate: new Date(req.body.date), ...req.body };

      const response = await this.fixtureUseCase.create(payload);
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

  findOneById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      let payload = { id };
      validate(schema, payload);
      const response = await this.fixtureUseCase.findOneById(id);
      if (response.success) {
        return res.status(200).json({ success: true, message: response.message, data: response.data });
      }
      return res.status(404).json({ success: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  updateOneById = async (req: Request, res: Response) => {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
        homeTeam: Joi.string(),
        awayTeam: Joi.string(),
        date: Joi.date(),
      });
      validate(schema, { id: req.params.id, ...req.body });
      const payload = { ...req.body, updatedBy: req.user.id };
      const response = await this.fixtureUseCase.updateOneById(req.params.id, payload);
      if (response.success) {
        return res.status(200).json({ success: true, message: response.message, data: response.data });
      }
      return res.status(404).json({ success: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  updateScore = async (req: Request, res: Response) => {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
        homeTeamScore: Joi.number().required(),
        awayTeamScore: Joi.number().required(),
      });
      validate(schema, { id: req.params.id, ...req.body });
      const payload = { ...req.body, updatedBy: req.user.id };
      const response = await this.fixtureUseCase.updateOneByIdScore(req.params.id, payload);
      if (response.success) {
        return res.status(200).json({ success: true, message: response.message, data: response.data });
      }
      return res.status(404).json({ success: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  deleteOneById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      let payload = { id };
      validate(schema, payload);
      const response = await this.fixtureUseCase.deleteOneById(id);
      if (response.success) {
        return res.status(200).json({ success: true, message: response.message, data: response.data });
      }
      return res.status(404).json({ success: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const response = await this.fixtureUseCase.findAll();
      if (response.success) {
        return res.status(200).json({ success: true, message: response.message, data: response.data });
      }
      return res.status(404).json({ success: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  findAllByTeam = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      let payload = { id };
      validate(schema, payload);
      const response = await this.fixtureUseCase.findFixturesByTeam(id);
      if (response.success) {
        return res.status(200).json({ success: true, message: response.message, data: response.data });
      }
      return res.status(404).json({ success: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  findUpcomingFixtures = async (req: Request, res: Response) => {
    try {
      const response = await this.fixtureUseCase.findUpcomingFixtures();
      if (response.success) {
        return res.status(200).json({ success: true, message: response.message, data: response.data });
      }
      return res.status(404).json({ success: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  findPastFixtures = async (req: Request, res: Response) => {
    try {
      const response = await this.fixtureUseCase.findPastFixtures();
      if (response.success) {
        return res.status(200).json({ success: true, message: response.message, data: response.data });
      }
      return res.status(404).json({ success: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  searchFixtures = async (req: Request, res: Response) => {
    try {
      const { query } = req.query;
      const schema = Joi.object({
        query: Joi.string().required(),
      });
      let payload = { query };
      validate(schema, payload);
      const response = await this.fixtureUseCase.searchFixtures(query as string);
      if (response.success) {
        return res.status(200).json({ success: true, message: response.message, data: response.data });
      }
      return res.status(404).json({ success: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message!, error: error.name! });
      }
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };

  searchFixturesByTeam = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { query } = req.query;
      const schema = Joi.object({
        id: Joi.string().required(),
        query: Joi.string().required(),
      });
      let payload = { id, query };
      validate(schema, payload);
      const response = await this.fixtureUseCase.searchFixturesByTeam(id, query as string);
      if (response.success) {
        return res.status(200).json({ success: true, message: response.message, data: response.data });
      }
      return res.status(404).json({ success: false, message: response.message, error: response.error! });
    } catch (error: any) {
      console.error('error', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message!, error: error.name! });
      }
      return res.status(500).json({ success: false, message: error.message!, error: error.name! });
    }
  };
}
