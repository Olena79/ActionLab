import mongoose, { Document, Schema } from 'mongoose'
import { OwnCalendarEntity } from '../entities/OwnCalendarEntity'

interface OwnCalendarDoc
  extends OwnCalendarEntity,
    Document {}

const OwnCalendarModel = new Schema<OwnCalendarDoc>(
  {
    dates: { type: [String], required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    userId: { type: String, required: true },
  },
  { timestamps: true, collection: 'events' },
)

export default mongoose.model(
  'CalendarEvent',
  OwnCalendarModel,
)
