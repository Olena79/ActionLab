import express from 'express'
import usersRoutes from './users'
import usersSeminars from './seminar'
import paymentRoutes from './payments'
import chatRoutes from './chat'

const router = express.Router()

router.use('/users', usersRoutes)
router.use('/seminar', usersSeminars)
router.use('/payments', paymentRoutes)
router.use('/chat', chatRoutes)

export default router
