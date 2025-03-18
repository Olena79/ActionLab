import { query } from 'express-validator'

export const validateIngridientRequest = [
  query('lang')
    .optional()
    .isString()
    .isIn(['UA', 'EN'])
    .withMessage(
      "Invalid language parameter. Allowed values: 'UA', 'EN'",
    ),

  query('fields')
    .optional()
    .custom((value) => {
      const allowedFields = [
        '_id',
        'type',
        'nameUA',
        'nameEN',
        'variations',
      ]
      const requestedFields = value.split(',')
      const isValid = requestedFields.every(
        (field: string) => allowedFields.includes(field),
      )

      if (!isValid) {
        throw new Error('Invalid fields in request')
      }
      return true
    }),
]
