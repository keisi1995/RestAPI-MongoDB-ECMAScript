const { body } = require('express-validator');
import { validationResult } from 'express-validator';
import { error } from '../helpers/httpResponse';

// Middleware para validar los datos del hotel
export const validateStore = [
    body('theaterId').exists().isInt(),
    body('location').exists().isObject(),
    body('location.address').exists().isObject(),
    body('location.address.street1').exists().isString(),
    body('location.address.city').exists().isString(),
    body('location.address.state').exists().isString(),
    body('location.address.zipcode').exists().isString(),
    body('location.geo').exists().isObject(),
    body('location.geo.type').exists().isString().equals('Point'),
    body('location.geo.coordinates').exists().isArray().withMessage('Coordinates must be an array'),
    body('location.geo.coordinates[0]').exists().isFloat(),
    body('location.geo.coordinates[1]').exists().isFloat(),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            // return error(res, 'Validation Error!.', 500, myErrors);
        }
        next();
    }
]