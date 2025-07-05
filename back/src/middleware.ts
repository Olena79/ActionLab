import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      userId?: string
    }
  }
}

const JWT_SECRET =
  process.env.JWT_SECRET || 'some_secret_key'

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    console.log('🚫 No authorization header')
    res
      .status(401)
      .json({ message: 'No authorization header' })
    return
  }

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader
  console.log('🛡️ Authorization header:', authHeader)
  console.log('🔑 Parsed token:', token)

  if (!token) {
    console.log('🚫 Token missing in header')
    res.status(401).json({ message: 'Token missing' })
    return
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      userId: string
    }
    console.log('🔐 JWT payload:', payload)
    req.userId = payload.userId
    next()
  } catch (err) {
    console.log('❌ JWT verification error:', err)
    res.status(401).json({ message: 'Invalid token' })
    return
  }
}
