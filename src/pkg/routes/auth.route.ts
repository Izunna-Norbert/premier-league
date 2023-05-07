import express from 'express';
import handlers from '..';

const router = express.Router();

export function AuthRoutes() {
  const handler = handlers.UserService;

  router.route('/sign-up').post(handler.createUser);
  router.route('/sign-up/admin').post(handler.createAdmin);
  router.route('/sign-in').post(handler.signIn);

  return router;
}
