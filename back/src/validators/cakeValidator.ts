import { body, query } from 'express-validator'

export const validateCakeRequest = [
  query('fields')
    .optional()
    .custom((value) => {
      const allowedFields = [
        '_id',
        'img',
        'cakeNameUA',
        'cakeNameEN',
        'doughUA',
        'doughEN',
        'creamUA',
        'creamEN',
        'layerUA',
        'layerEN',
        'toppingUA',
        'toppingEN',
        'decorUA',
        'decorEN',
        'descriptionUA',
        'descriptionEN',
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
