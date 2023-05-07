import express from 'express';
import handlers from '..';

const router = express.Router();

export function SearchRoutes() {
    const handler = handlers.UserService;
    
    router.route('/').get(handler.advancedFind);
    return router;
}

