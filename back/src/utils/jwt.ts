import jwt from 'jsonwebtoken'

const JWT_SECRET =
  process.env.JWT_SECRET || 'some_secret_key'

const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET ||
  'some_refresh_secret_key'

export const generateJwtToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '7d',
  })
}

export function generateRefreshToken(
  userId: string,
): string {
  return jwt.sign({ userId }, JWT_REFRESH_SECRET, {
    expiresIn: '30d',
  })
}
