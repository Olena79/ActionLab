import { Document, model, Schema, Types } from 'mongoose'

export type Language = 'ua' | 'en'

export interface IUserMembership {
  _id?: Types.ObjectId
  invoiceDate?: Date
  isPaid: boolean
}

export interface IUser extends Document {
  _id: Types.ObjectId
  date: Date
  firstName: string
  lastName: string
  phone: string
  email: string
  membership: IUserMembership[]
}

const UserSeminarSchema = new Schema<IUserMembership>({
  invoiceDate: { type: Date },
  isPaid: { type: Boolean, default: false },
})

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    membership: { type: [UserSeminarSchema], default: [] },
  },
  { timestamps: true, collection: 'users' },
)

export const UserModel = model<IUser>('User', UserSchema)
