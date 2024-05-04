import express from 'express';
const router = express.Router();

import { validateLogin } from '../http/validator/user';
import * as Auth from '../http/controller/authenticateController';
 
router.route('/')
    .post(validateLogin, Auth.login)

export default router;