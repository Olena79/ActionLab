import mongoose, { Schema, Document } from 'mongoose'

export interface IPayment extends Document {
  _id: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  seminarId: mongoose.Types.ObjectId
  seminarDate: Date
  amount: number
  currency: string
  invoiceId: string
  invoiceUrl: string
  orderId: string
  status: 'pending' | 'success' | 'failed'
  createdAt: Date
  updatedAt: Date
}

const paymentSchema = new Schema<IPayment>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    seminarId: {
      type: Schema.Types.ObjectId,
      ref: 'Seminar',
      required: true,
    },
    seminarDate: { type: Date, required: true },
    amount: { type: Number, required: true, min: 1 },
    currency: {
      type: String,
      default: 'UAH',
      enum: ['UAH'],
    },
    invoiceId: { type: String, required: true },
    invoiceUrl: { type: String, required: true },
    orderId: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true, collection: 'payments' },
)

export const PaymentModel = mongoose.model<IPayment>(
  'Payment',
  paymentSchema,
)
