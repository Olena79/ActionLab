import express from 'express'
import authRoutes from './auth'
import calendarRoutes from './ownCalendar'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/ownCalendar', calendarRoutes)

export default router
