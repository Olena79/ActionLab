import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import User from '../models/User'
import {
  sendVerificationEmail,
  sendConfirmationEmail,
} from '../config/mailer'
import { apiMessages } from '../config/i18n'
import { registerUserSchema } from '../validators/userValidator'

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

      for (const key in fieldErrors) {
        const message = fieldErrors[key]?.[0]
        if (message) formattedErrors[key] = message
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

    // ✉️ Надсилання листа
    await sendVerificationEmail(
      email,
      verifyToken,
      language,
    )

    res
      .status(201)
      .json({ message: t.success, user: newUser })
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
