import express from 'express';
import handlers from '..';
import { authenticateAdmin, authenticateUser } from '../middlewares/auth.middleware';

const router = express.Router();

export function UserRoutes() {
  const handler = handlers.UserService;

  router.use(authenticateUser);
  router.route('/').get(handler.getAllUsers);
  router
    .route('/:id')
    .get(handler.getUserById)
    .delete(authenticateAdmin, handler.deleteUserById)
    .put(authenticateAdmin, handler.updateUserById);
  return router;
}
