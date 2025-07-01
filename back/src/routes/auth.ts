import { Router } from 'express'
import { registerUser } from '../controllers/authController'

const router = Router()

router.post('/register', registerUser)
console.log('authRoutes loaded')

export default router
