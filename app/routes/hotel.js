import express from 'express';
const router = express.Router();

import { validateStore } from '../http/validator/hotel';
import authMiddleware from '../http/middleware/authMiddleware';
import * as Hotel from '../http/controller/hotelController';

router.route('/')
    .get(authMiddleware, Hotel.index)
    .post(authMiddleware, validateStore, Hotel.store)
        
export default router;