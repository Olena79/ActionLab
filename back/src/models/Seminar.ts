import mongoose, { Document, Schema, Types } from 'mongoose'

export interface ISeminar extends Document {
  _id: Types.ObjectId
  title: string
  description?: string
  date: Date
}

const seminarSchema = new Schema<ISeminar>(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
  },
  { timestamps: true, collection: 'seminars' },
)

export default mongoose.model<ISeminar>(
  'SeminarModel',
  seminarSchema,
)
