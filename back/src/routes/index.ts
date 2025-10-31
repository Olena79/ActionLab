import express from 'express'
import usersRoutes from './users'
import paymentRoutes from './payments'

const router = express.Router()

router.use('/users', usersRoutes)
router.use('/payments', paymentRoutes)

export default router
