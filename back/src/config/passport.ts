import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../models/User'
import {
  generateJwtToken,
  generateRefreshToken,
} from '../utils/jwt'

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },
    async (_, __, profile, done) => {
      try {
        const email = profile.emails?.[0].value!
        let user = await User.findOne({ email })
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            role: 'user',
            verified: true,
            language: 'ua',
          })
        }
        // Генеруємо JWT та refreshToken
        const accessToken = generateJwtToken(
          user._id.toString(),
        )
        const refreshToken = generateRefreshToken(
          user._id.toString(),
        )
        user.refreshToken = refreshToken
        await user.save()
        // Повертаємо обидва токени
        return done(null, {
          user,
          accessToken,
          refreshToken,
        })
      } catch (err) {
        return done(err as Error, undefined)
      }
    },
  ),
)

passport.serializeUser((obj: any, done) => {
  // Зберігаємо лише id користувача
  done(null, obj.user._id.toString())
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})
