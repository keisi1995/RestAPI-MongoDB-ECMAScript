import jwt from 'jsonwebtoken';

import { error } from '../helpers/httpResponse';

export default (req, res, next) => {
    console.log('midelware')
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return error(res, 'Authentication token not provided!.', 401);
    }
    
    const token = authHeader.split(' ')[1];
  
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
        next();
    } catch (messagge) {
        return error(res, `${messagge}!.`, 401);
    }
}