import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import User from '../../model/user';
import { error, success } from '../helpers/httpResponse';
import { validationErrors } from '../helpers/myHelper';
     
export const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const myErrors = validationErrors(errors.array());
            return error(res, 'Validation Error!.', 500, myErrors);
        }
        
        const { email, password } = req.body;
        
        const user = await User.findOne({ email }).withPassword();
    
        if (!user)  { return error(res, 'User does not exist!.', 401); }
    
        const passwordValid = await user.comparePassword(password);
        if (!passwordValid) { return error(res, 'Invalid password!.', 401); }
        
        const { _id, first_name, last_name } = user;
        const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TTL });
        
        return success(res, 'Login success!.', 200, { token, _id, first_name, last_name });
    } catch (e) {
        return error(res, e.message, 500);
    }
}