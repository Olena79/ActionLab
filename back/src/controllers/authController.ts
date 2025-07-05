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
  await sendVerificationEmail(email, verifyToken, language)
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

  console.log('accessToken from verifyUser: ', accessToken)
  console.log(
    'refreshToken from verifyUser: ',
    refreshToken,
  )

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
