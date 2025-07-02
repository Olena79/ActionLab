import { Router } from 'express'
import passport from 'passport'
import {
  refreshToken,
  registerUser,
  verifyUser,
} from '../controllers/authController'
import { authenticateJWT } from '../middleware'
import { IUser } from 'models/User'

const router = Router()

router.post('/register', registerUser)
router.get('/verify/:token', verifyUser)

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
)

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    session: false,
  }),
  (req, res) => {
    const { token } = req.user as {
      user: any
      token: string
      _id: string
    }

    // Відправимо токен
    res.redirect(
      `${process.env.CLIENT_URL}/?token=${token}`,
    )
  },
)

router.get('/private', authenticateJWT, (req, res) => {
  res.json({
    message: 'Це приватний маршрут',
    userId: req.userId || null,
  })
})

router.post('/token', refreshToken)

export default router
