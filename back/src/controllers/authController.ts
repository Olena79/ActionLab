import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import {
  sendVerificationEmail,
  sendConfirmationEmail,
  sendCoachApprovalRequest,
  sendErrorNotificationToAdmin,
  sendRejectionCoachEmail,
} from '../config/mailer'
import { apiMessages } from '../config/i18n'
import { registerUserSchema } from '../validators/userValidator'
import {
  generateJwtToken,
  generateRefreshToken,
} from '../utils/jwt'

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const lang = (req.body.language as 'ua' | 'en') || 'ua'
  const t = apiMessages[lang]

  const parsed = registerUserSchema.safeParse(req.body)
  if (!parsed.success) {
    const errors: Record<string, string> = {}
    const fieldErrors = parsed.error.flatten().fieldErrors

    for (const k of Object.keys(
      fieldErrors,
    ) as (keyof typeof fieldErrors)[]) {
      const errorArray = fieldErrors[k]
      if (errorArray && errorArray.length > 0) {
        errors[k] = errorArray[0]
      }
    }
    res.status(400).json({ message: t.invalid, errors })
    return
  }
  const { name, email, password, role, language } =
    parsed.data
  if (await User.findOne({ email })) {
    res.status(409).json({ message: t.exists })
    return
  }
  const hashed = await bcrypt.hash(password, 10)
  const verifyToken = crypto.randomBytes(32).toString('hex')
  const newUser = await User.create({
    name,
    email,
    password: hashed,
    role,
    verifyToken,
    verified: false,
    language,
  })
  const accessToken = generateJwtToken(
    newUser._id.toString(),
  )
  const refreshToken = generateRefreshToken(
    newUser._id.toString(),
  )
  newUser.refreshToken = refreshToken
  await newUser.save()

  if (role === 'coach') {
    // якщо тренер — лист адміну для підтвердження
    await sendCoachApprovalRequest(newUser, language)
  } else {
    // звичайний користувач — надсилаємо верифікацію
    await sendVerificationEmail(
      email,
      verifyToken,
      language,
    )
  }

  res.status(201).json({
    message: t.success,
    user: newUser,
    accessToken,
    refreshToken,
  })
}

export const verifyUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const token = req.params.token as string
  console.log('Token from verifyUser: ', token)
  if (!token) {
    res
      .status(400)
      .json({ message: 'Verification token is required' })
    return
  }
  const user = await User.findOne({ verifyToken: token })
  console.log('user from verifyUser: ', user)
  if (!user) {
    res
      .status(404)
      .json({ message: 'Invalid or expired token' })
    return
  }
  user.verified = true
  user.verifyToken = undefined

  const uid = user._id.toString()
  const accessToken = generateJwtToken(uid)
  const refreshToken = generateRefreshToken(uid)

  // save refreshToken on user
  user.refreshToken = refreshToken
  await user.save()

  // email them a “confirmation” message
  await sendConfirmationEmail(user.email, user.language)

  res.status(200).json({
    message: 'Email successfully verified',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      verified: true,
    },
    accessToken,
    refreshToken,
  })
  return
}

export const refreshToken = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { token } = req.body
  console.log('🔐 Received refresh token:', token)
  if (!token) {
    res
      .status(401)
      .json({ message: 'Refresh token required' })
    return
  }
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET!,
    ) as { userId: string }
    const user = await User.findById(payload.userId)
    if (!user) {
      res.status(403).json({ message: 'User not found' })
      return
    }
    if (!user || user.refreshToken !== token) {
      res
        .status(403)
        .json({ message: 'Invalid refresh token' })
      return
    }
    const newAccess = generateJwtToken(user._id.toString())
    const newRefresh = generateRefreshToken(
      user._id.toString(),
    )
    user.refreshToken = newRefresh
    await user.save()
    res.json({
      accessToken: newAccess,
      refreshToken: newRefresh,
    })
    return
  } catch {
    res
      .status(403)
      .json({ message: 'Invalid or expired refresh token' })
    return
  }
}

export const loginUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email }).select(
      '+password',
    )
    // Якщо користувача не знайдено
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    // Перевірка паролю
    if (!user.password) {
      res.status(400).json({
        message: 'User has no password',
      })
      return
    }
    const isMatch = await bcrypt.compare(
      password,
      user.password,
    )
    if (!isMatch) {
      res
        .status(401)
        .json({ message: 'Invalid credentials' })
      return
    }

    // Перевірка верифікації
    if (!user.verified) {
      res
        .status(403)
        .json({ message: 'User is not verify' })
      return
    }

    // Генерація токенів
    const uid = user._id.toString()
    const accessToken = generateJwtToken(uid)
    const refreshToken = generateRefreshToken(uid)

    user.refreshToken = refreshToken
    await user.save()

    res.status(200).json({
      user: {
        userId: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        verified: user.verified,
      },
      accessToken,
      refreshToken,
    })
  } catch (err) {
    console.error('❌ Login error:', err)
    res
      .status(500)
      .json({ message: 'Server error, try again later' })
  }
}

export const approveCoach = async (
  req: Request,
  res: Response,
) => {
  try {
    const token = req.params.token
    const user = await User.findOne({ verifyToken: token })
    console.log(
      'Токен і юзер з approveCoach: ',
      token,
      user,
    )

    if (!user || user.role !== 'coach') {
      res.status(404).send(`
        <html>
          <body style="text-align: center; padding: 50px;">
            <h1>❌ Помилка</h1>
            <p>Тренера не знайдено або токен недійсний.</p>
          </body>
        </html>
      `)
      return
    }

    // Перевірка, чи тренер уже підтверджений
    if (user.verified) {
      res.send(`
        <html>
          <body style="text-align: center; padding: 50px;">
            <h1>ℹ️ Тренер вже підтверджений</h1>
            <p>Цей тренер вже має активний статус і може увійти.</p>
          </body>
        </html>
      `)
      return
    }

    user.verified = true
    user.verifyToken = undefined
    user.refreshToken = generateRefreshToken(
      user._id.toString(),
    )
    await user.save()
    const freshUser = await User.findById(user._id)
    console.log(
      '🧾 User after save:',
      freshUser?.toObject(),
    )

    // email them a “confirmation” message
    if (freshUser) {
      await sendConfirmationEmail(
        freshUser.email,
        freshUser.language,
      )
    }

    res.redirect(
      `${process.env.CLIENT_URL}/success-coach-approved`,
    )
  } catch (error: any) {
    console.error('❌ approveCoach error:', error)
    await sendErrorNotificationToAdmin(
      '❌ Помилка при підтвердженні тренера',
      error,
      'Контролер: approveCoach',
    )
    res.status(500).send(`
    <html>
      <body style="text-align: center; padding: 50px;">
        <h1>⚠️ Сталася помилка</h1>
        <p>Будь ласка, спробуйте пізніше.</p>
      </body>
    </html>
  `)
  }
}

export const rejectCoach = async (
  req: Request,
  res: Response,
) => {
  try {
    const token = req.params.token
    const user = await User.findOne({ verifyToken: token })

    // Перевірка, чи тренер уже підтверджений
    if (!user?.verifyToken) {
      res.send(`
        <html>
          <body style="text-align: center; padding: 50px;">
            <h1>ℹ️ Тренер вже видалений</h1>
          </body>
        </html>
      `)
      return
    }

    if (!user || user.role !== 'coach') {
      res.status(404).send(`
        <html>
          <body style="text-align: center; padding: 50px;">
            <h1>❌ Помилка</h1>
            <p>Тренера не знайдено або токен недійсний.</p>
          </body>
        </html>
      `)
      return
    }

    await User.deleteOne({ _id: user._id })

    await sendRejectionCoachEmail(user.email, user.language)

    res.redirect(`${process.env.CLIENT_URL}/reject-coach`)
  } catch (error: any) {
    console.error('❌ approveCoach error:', error)
    await sendErrorNotificationToAdmin(
      '❌ Помилка при видаленні тренера',
      error,
      'Контролер: rejectCoach',
    )
    res.status(500).send(`
  <html>
    <body style="text-align: center; padding: 50px;">
      <h1>⚠️ Сталася помилка</h1>
      <p>Будь ласка, спробуйте пізніше.</p>
    </body>
  </html>
`)
  }
}
