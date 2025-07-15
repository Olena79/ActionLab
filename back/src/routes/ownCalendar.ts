import {
  createCalendarEvent,
  getOwnCalendarEvents,
} from '../controllers/OwnCalendarController'
import { Router } from 'express'
import { authenticateJWT } from '../middleware'

const router = Router()

router.post(
  '/own-calendar',
  authenticateJWT,
  createCalendarEvent,
)

router.get(
  '/own-calendar',
  authenticateJWT,
  getOwnCalendarEvents,
)

export default router
