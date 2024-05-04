import express from 'express';
const router = express.Router();

import { validateStore } from '../http/validator/category';
import authMiddleware from '../http/middleware/authMiddleware';
import * as Category from '../http/controller/categoryController';

router.route('/')
    .get(authMiddleware, Category.index)
    .post(authMiddleware, validateStore, Category.store)

router.route('/:id_user(\\d+)')
    .get(authMiddleware, Category.show)
    .put(authMiddleware, validateStore, Category.update)
    .delete(authMiddleware, Category.destroy)

export default router;