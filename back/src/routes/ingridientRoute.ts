import express from 'express'
import { getIngredients } from '../controllers/ingridientController'
import { validateIngridientRequest } from '../validators/ingridientValidator'

const router = express.Router()

router.get(
  '/ingredients',
  validateIngridientRequest,
  getIngredients,
)

export default router
