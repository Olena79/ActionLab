import jwt from 'jsonwebtoken'

const JWT_SECRET =
  process.env.JWT_SECRET || 'some_secret_key'

export const generateJwtToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '7d',
  })
}
