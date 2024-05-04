import express from 'express';
const router = express.Router();

import { validateStore } from '../http/validator/user';
import authMiddleware from '../http/middleware/authMiddleware';
import * as User from '../http/controller/userController';

router.route('/')
    .get(authMiddleware, User.index)
    .post(validateStore, User.store)

router.route('/:id_user(\\d+)')
    .get(authMiddleware, User.show)
    .put(validateStore, authMiddleware, User.update)
    .delete(authMiddleware, User.destroy)

export default router;