const { body } = require('express-validator');

export const validateStore = [
    body('first_name')
        .trim()
        .not().isEmpty().withMessage('El campo es requerido')
        .matches(/^[a-zA-Z\s]+$/).withMessage('El campo solo puede contener letras y espacios')
        .isLength({min: 5, max: 20}).withMessage('El campo debe tener entre 5 y 20 caracteres'),

    body('last_name')
        .trim()
        .not().isEmpty().withMessage('El campo es requerido')
        .matches(/^[a-zA-Z\s]+$/).withMessage('El campo solo puede contener letras y espacios')
        .isLength({min: 5, max: 20}).withMessage('El campo debe tener entre 5 y 20 caracteres'),

    body('email')
        .trim()
        .not().isEmpty().withMessage('El campo es requerido')
        .isEmail().withMessage('El campo no tiene un formato de email válido'),
    
    body('password')
        .trim()
        .not().isEmpty().withMessage('El campo es requerido')
        .isLength({min: 5, max: 10}).withMessage('El campo debe tener entre 5 y 10 caracteres'),

    body('edad')
        .optional()
        .isInt({ min: 18 }).withMessage('La edad debe ser un número entero mayor o igual a 18')
]


export const validateLogin = [
    body('email')
        .trim()
        .not().isEmpty().withMessage('El campo es requerido')
        .isEmail().withMessage('El campo no tiene un formato de email válido'),
    
    body('password')
        .trim()
        .not().isEmpty().withMessage('El campo es requerido')
        .isLength({min: 5, max: 10}).withMessage('El campo debe tener entre 5 y 10 caracteres'), 
]
