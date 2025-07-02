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
    res
      .status(401)
      .json({ message: 'No authorization header' })
    return
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    res.status(401).json({ message: 'Token missing' })
    return
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      userId: string
    }
    req.userId = payload.userId
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
    return
  }
}
