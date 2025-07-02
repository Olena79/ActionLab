import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import {
  sendVerificationEmail,
  sendConfirmationEmail,
} from '../config/mailer'
import { apiMessages } from '../config/i18n'
import { registerUserSchema } from '../validators/userValidator'

const generateAccessToken = (userId: string) =>
  jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  })

const generateRefreshToken = (userId: string) =>
  jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: '30d',
  })

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  console.log('📨 registerUser loaded')

  const lang: 'ua' | 'en' =
    req.body.language ||
    (req.headers['accept-language'] as 'ua' | 'en') ||
    'ua'
  const t = apiMessages[lang] || apiMessages.ua

  try {
    // ✅ Валідація даних
    const parsed = registerUserSchema.safeParse(req.body)
    if (!parsed.success) {
      const formattedErrors: Record<string, string> = {}
      const fieldErrors = parsed.error.flatten()
        .fieldErrors as Record<string, string[]>

      const formatted: Record<string, string> = {}
      for (const key in fieldErrors) {
        formatted[key] = fieldErrors[key]![0]
      }

      res.status(400).json({
        message: t.invalid,
        errors: formattedErrors,
      })
      return
    }

    const { name, email, password, role, language } =
      parsed.data

    // 🔎 Перевірка наявності користувача
    const existing = await User.findOne({ email })
    if (existing) {
      res.status(409).json({ message: t.exists })
      return
    }

    // 🔐 Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10)
    const verifyToken = crypto
      .randomBytes(32)
      .toString('hex')

    // 💾 Створення користувача
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      verifyToken,
      verified: false,
      language,
    })

    // Генеруємо JWT після створення користувача
    const userId = newUser._id.toString()
    const accessToken = generateAccessToken(userId)
    const refreshToken = generateRefreshToken(userId)

    newUser.refreshToken = refreshToken
    await newUser.save()

    // ✉️ Надсилання листа
    await sendVerificationEmail(
      email,
      verifyToken,
      language,
    )

    res.status(201).json({
      message: t.success,
      user: newUser,
      accessToken,
      refreshToken,
    })
  } catch (error) {
    console.error('❌ Register error:', error)
    res.status(500).json({ message: t.error })
  }
}

export const verifyUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  console.log('🔍 Запит на верифікацію прийшов')

  const { token } = req.params
  console.log('🔐 Отримано токен:', token)

  if (!token || typeof token !== 'string') {
    console.warn(
      '⚠️ Токен не надано або має неправильний тип',
    )
    res
      .status(400)
      .json({ message: 'Verification token is required' })
    return
  }

  try {
    const user = await User.findOne({ verifyToken: token })
    console.log('🔎 Користувач знайдений:', !!user)

    if (!user) {
      console.warn(
        '❌ Токен недійсний або користувача не знайдено',
      )
      res.status(404).json({
        message: 'Invalid or expired verification token',
      })
      return
    }

    user.verified = true
    user.verifyToken = undefined
    await user.save()
    console.log('🔐 Користувача збережено:', user)

    await sendConfirmationEmail(user.email, user.language)

    res
      .status(200)
      .json({ message: 'Email successfully verified' })
    return
  } catch (err) {
    console.error('Verification error:', err)
    res.status(500).json({ message: 'Server error' })
    return
  }
}

export const refreshToken = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { token } = req.body // отримуємо refreshToken з фронту

  if (!token) {
    res
      .status(401)
      .json({ message: 'Refresh token required' })
    return
  }

  try {
    // Перевірка валідності refreshToken
    const payload = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET!,
    ) as { userId: string }

    // Знайти користувача і перевірити, що токен співпадає
    const user = await User.findById(payload.userId)
    if (!user || user.refreshToken !== token) {
      res
        .status(403)
        .json({ message: 'Invalid refresh token' })
      return
    }

    // Генеруємо нові токени
    const userId = user._id.toString()
    const newAccess = generateAccessToken(userId)
    const newRefresh = generateRefreshToken(userId)

    // Оновлюємо токен
    user.refreshToken = newRefresh
    await user.save()
    res.json({
      accessToken: newAccess,
      refreshToken: newRefresh,
    })
  } catch (err) {
    res
      .status(403)
      .json({ message: 'Invalid or expired refresh token' })
    return
  }
}
