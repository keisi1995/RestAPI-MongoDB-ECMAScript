const { body } = require('express-validator');

export const validateStore = [
    body('description')
        .trim()
        .not().isEmpty().withMessage('El campo es requerido')
        .matches(/^[a-zA-Z\s]+$/).withMessage('El campo solo puede contener letras y espacios')
        .isLength({min: 5, max: 20}).withMessage('El campo debe tener entre 5 y 20 caracteres'),
     
    body('total').
        isFloat({ decimalSeparator: '.' }).
        withMessage('El campo debe ser un número decimal'),
    
    body('stock').
        isNumeric().withMessage('El campo debe ser numérico'),
   
]
