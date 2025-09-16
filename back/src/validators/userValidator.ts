import { body } from 'express-validator'

export const registerUserValidator = [
  body('firstName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('First name too short'),
  body('lastName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Last name too short'),
  body('phone')
    .trim()
    .matches(/^[0-9+\-\s]{7,}$/)
    .withMessage('Invalid phone'),
  body('email').isEmail().withMessage('Invalid email'),
  body('seminar')
    .notEmpty()
    .withMessage('Seminar is required'),
]
