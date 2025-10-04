import { Document, model, Schema, Types } from 'mongoose'

export type Language = 'ua' | 'en'

export interface IUserSeminar {
  seminarId: Types.ObjectId
  title: string
  description?: string
  date: Date
  isPaid: boolean
}

export interface IUser extends Document {
  _id: Types.ObjectId
  firstName: string
  lastName: string
  phone: string
  email: string
  seminars: IUserSeminar[]
  language: Language
}

const UserSeminarSchema = new Schema<IUserSeminar>(
  {
    seminarId: {
      type: Schema.Types.ObjectId,
      ref: 'Seminar',
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    isPaid: { type: Boolean, default: false },
  },
  { _id: false }, // 👈 щоб Mongoose не створював зайвий _id для піддокумента
)

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    seminars: { type: [UserSeminarSchema], default: [] },
    language: {
      type: String,
      enum: ['ua', 'en'],
      default: 'ua',
    },
  },
  { timestamps: true },
)

export const UserModel = model<IUser>('User', UserSchema)
