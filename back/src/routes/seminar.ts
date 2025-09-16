import { Router } from 'express'
import { getFutureSeminars } from '../controllers/seminarController'

const router = Router()

router.get('/future', getFutureSeminars)

export default router
