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

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails?.[0].value
//         if (!email) {
//           return done(
//             new Error('Email not found in Google profile'),
//           )
//         }

//         let user = await User.findOne({ email })

//         if (!user) {
//           user = await User.create({
//             name: profile.displayName,
//             email,
//             role: 'user',
//             verified: true,
//             language: 'ua',
//           })
//         }

//         // Генеруємо access та refresh токени
//         const token = generateJwtToken(user._id.toString())
//         const refresh = generateRefreshToken(
//           user._id.toString(),
//         )

//         // Зберігаємо refresh токен у БД
//         user.refreshToken = refresh
//         await user.save()

//         // Повертаємо користувача і токени
//         return done(null, {
//           user,
//           accessToken: token,
//           refreshToken: refresh,
//         })
//       } catch (err) {
//         return done(err as Error)
//       }
//     },
//   ),
// )

// passport.serializeUser((user: any, done) => {
//   done(null, user.id)
// })

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id)
//     done(null, user)
//   } catch (err) {
//     done(err)
//   }
// })
