import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import User from '../models/User'
import { sendVerificationEmail } from '../config/mailer'
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
