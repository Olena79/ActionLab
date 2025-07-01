import mongoose, { Document, Schema } from 'mongoose'

export type Role = 'user' | 'coach' | 'admin'
export type Language = 'ua' | 'en'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: Role
  verified: boolean
  verifyToken?: string
  language: Language
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'coach', 'admin'],
      default: 'user',
    },
    verified: { type: Boolean, default: false },
    verifyToken: { type: String },
    language: {
      type: String,
      enum: ['ua', 'en'],
      default: 'ua',
    },
  },
  { timestamps: true, collection: 'users' },
)

export default mongoose.model<IUser>('User', userSchema)
