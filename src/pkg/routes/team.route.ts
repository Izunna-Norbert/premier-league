import express from 'express';
import handlers from '..';
import { authenticateAdmin, authenticateUser } from '../middlewares/auth.middleware';

const router = express.Router();

export function TeamRoutes() {
  const handler = handlers.TeamService;
  const fixtureHandler = handlers.FixtureService;

  router.use(authenticateUser);

  router.route('/').get(handler.findAll).post(authenticateAdmin, handler.create);
  router
    .route('/:id')
    .get(handler.getTeamById)
    .delete(authenticateAdmin, handler.deleteTeamById)
    .put(authenticateAdmin, handler.updateTeamById);
  router.route('/:id/fixtures').get(fixtureHandler.findAllByTeam);

  return router;
}
