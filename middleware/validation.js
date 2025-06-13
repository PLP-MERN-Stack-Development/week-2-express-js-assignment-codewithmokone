// validate product
const { body, validationResult} = require('express-validator');

const validateProduct = [
    body('name')
        .trim()
        .notEmpty().withMessage('Product name is required.')
        .isLength({ min: 2}).withMessage('Product name must be at least 2 characters long.'),

    body('description')
        .notEmpty().withMessage('Product description is required.')
        .isLength({ max: 500}).withMessage('Description must not exceed 500 characters.'),

    body('price')
        .notEmpty().withMessage('Price is required.')
        .isFloat({ gt: 0 }).withMessage('Price must be a positive number.'),

    body('category')
        .notEmpty().withMessage('Category is required.')
        .isString().withMessage('Category must be a string.'),

    body('inStock')
        .isBoolean().withMessage('inStock must be true or false'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        next();
    }
];

module.exports = validateProduct;