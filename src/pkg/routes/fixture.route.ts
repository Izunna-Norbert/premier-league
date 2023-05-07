import express from 'express';
import handlers from '..';
import { authenticateAdmin, authenticateUser } from '../middlewares/auth.middleware';

const router = express.Router();

export function FixtureRoutes() {
  const handler = handlers.FixtureService;

  router.use(authenticateUser);

  router.route('/').get(handler.findAll).post(authenticateAdmin, handler.createFixture);
  router.route('/upcoming').get(handler.findUpcomingFixtures);
  router.route('/past').get(handler.findPastFixtures);
  router
    .route('/:id')
    .get(handler.findOneById)
    .delete(authenticateAdmin, handler.deleteOneById)
    .put(authenticateAdmin, handler.updateOneById);
  router.route('/:id/score').put(authenticateAdmin, handler.updateScore);

  return router;
}
