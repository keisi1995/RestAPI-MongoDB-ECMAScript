import express from 'express';
const router = express.Router();

import { validateStore } from '../http/validator/product';
import authMiddleware from '../http/middleware/authMiddleware';
import * as Product from '../http/controller/productController';

router.route('/')
    .get(authMiddleware, Product.index)
    .post(authMiddleware, validateStore, Product.store)

router.route('/:id_product')
    .get(authMiddleware, Product.show)
    .put(authMiddleware, validateStore, Product.update)
    .delete(authMiddleware, Product.destroy)

export default router;