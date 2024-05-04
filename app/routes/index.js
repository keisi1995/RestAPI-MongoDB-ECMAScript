import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const router = express.Router();

import users from './user.js';
import categorys from './category.js';
import hotels from './hotel.js';
import authenticate from './authenticate.js';
import product from './product.js';

router.use(`/${process.env.API_PATH}/users`, users);
router.use(`/${process.env.API_PATH}/categorys`, categorys);
router.use(`/${process.env.API_PATH}/hotels`, hotels);
router.use(`/${process.env.API_PATH}/authenticate`, authenticate);
router.use(`/${process.env.API_PATH}/products`, product);

export default router;