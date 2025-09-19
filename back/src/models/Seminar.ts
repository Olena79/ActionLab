import mongoose, { Document, Schema, Types } from 'mongoose'

export interface ISeminar extends Document {
  _id: Types.ObjectId
  title: string
  description?: string
  dates: { date: Date; date2: string }[]
  duration?: string
  instructor?: string
  fullDescription?: string
  price?: string
  modules?: [
    {
      title: string
      description?: string
      fullDescription?: string[]
    },
  ]
  resultInfo?: string
}

const seminarSchema = new Schema<ISeminar>(
  {
    title: { type: String, required: true },
    description: { type: String },
    dates: [
      {
        date: { type: Date, required: true },
        date2: { type: String },
      },
    ],
    duration: { type: String },
    instructor: { type: String },
    fullDescription: { type: String },
    price: { type: String },
    modules: [
      {
        title: { type: String, required: true },
        description: { type: String },
        fullDescription: [{ type: String }],
      },
    ],
    resultInfo: { type: String },
  },
  { timestamps: true, collection: 'seminars' },
)

export default mongoose.model<ISeminar>(
  'SeminarModel',
  seminarSchema,
)
