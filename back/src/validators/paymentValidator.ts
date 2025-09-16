import { body } from 'express-validator'

export const createInvoiceValidator = [
  body('userId').isUUID().withMessage('Invalid userId'),
  body('seminarId')
    .isUUID()
    .withMessage('Invalid seminarId'),
  body('amount')
    .isInt({ min: 100 })
    .withMessage(
      'Amount must be at least 100 копійок (1 грн)',
    ),
  body('currency')
    .optional()
    .isIn(['UAH', 'USD', 'EUR'])
    .withMessage('Unsupported currency'),
]
