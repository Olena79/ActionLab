import mongoose, { Schema, Document } from 'mongoose'

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId
  seminarId: mongoose.Types.ObjectId
  amount: number
  currency: string
  invoiceId: string
  invoiceUrl: string
  status: 'pending' | 'success' | 'failed'
  createdAt: Date
}

const paymentSchema = new Schema<IPayment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    seminarId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'UAH' },
    invoiceId: { type: String, required: true },
    invoiceUrl: { type: String, required: true },
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
