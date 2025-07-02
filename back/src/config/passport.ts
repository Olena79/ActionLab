import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../models/User'
import { generateJwtToken } from '../utils/jwt'

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value
        if (!email) return done(null, false)

        const existingUser = await User.findOne({ email })
        if (existingUser) return done(null, existingUser)

        const newUser = await User.create({
          name: profile.displayName,
          email: profile.emails?.[0].value,
          password: '',
          role: 'user',
          verified: true,
          language: 'ua',
        })

        // generate JWT
        const token = generateJwtToken(
          newUser._id.toString(),
        )

        return done(newUser, token)
      } catch (err) {
        return done(err as Error, false)
      }
    },
  ),
)

passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value
        if (!email)
          return done(
            new Error('Email not found in Google profile'),
          )

        let user = await User.findOne({ email })

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            password: '',
            role: 'user',
            verified: true,
            language: 'ua',
          })
        }

        // Створюємо JWT токен
        const token = generateJwtToken(user.id)

        // Передаємо у done і користувача і токен
        return done(null, { user, token })
      } catch (err) {
        return done(err as Error)
      }
    },
  ),
)
