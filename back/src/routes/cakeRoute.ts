import express from 'express'
import {
  getCakes,
  getCakeById,
} from '../controllers/cakeController'
import { validateCakeRequest } from '../validators/cakeValidator'

const router = express.Router()

router.get('/classic_cakes', validateCakeRequest, getCakes)

router.get(
  `/classic_cakes/:_id`,
  validateCakeRequest,
  getCakeById,
)

export default router
