import express from 'express'
import usersRoutes from './users'
import usersSeminars from './seminar'
import paymentRoutes from './payments'

const router = express.Router()

router.use('/users', usersRoutes)
router.use('/seminar', usersSeminars)
router.use('/payments', paymentRoutes)

export default router
