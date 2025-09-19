import { Router } from 'express'
import {
  getFutureSeminars,
  getSeminars,
} from '../controllers/seminarController'

const router = Router()

router.get('/future', getFutureSeminars)
router.get('/all', getSeminars)

export default router
