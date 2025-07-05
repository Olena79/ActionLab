import { Router, Request, Response } from 'express'
import passport from 'passport'
import {
  refreshToken,
  registerUser,
  verifyUser,
} from '../controllers/authController'
import { authenticateJWT } from '../middleware'
import User from '../models/User'

const router = Router()

router.post('/register', registerUser)
router.get('/verify/:token', verifyUser)

// Google OAuth
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    session: false,
  }),
  (req, res) => {
    const { accessToken, refreshToken } = req.user as {
      user: any
      token: string
      refreshToken: string
      accessToken: string
    }

    // Відправимо токен
    res.redirect(
      `${process.env.CLIENT_URL}/?token=${accessToken}&refresh=${refreshToken}`,
    )
  },
)

// Приватний маршрут (JWT)
router.get(
  '/private',
  authenticateJWT,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.findById(req.userId)
      if (!user) {
        console.log('❌ No user:', user)
        res.status(404).json({ message: 'User not found' })
        return
      }

      res.json({
        userId: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        verified: user.verified,
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  },
)

router.post('/token', refreshToken)

export default router
