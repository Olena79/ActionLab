import { Router } from 'express'
import {
  registerUser,
  verifyUser,
} from '../controllers/authController'

const router = Router()

router.post('/register', registerUser)
router.get('/verify/:token', verifyUser)

export default router
