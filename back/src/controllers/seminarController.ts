import { Request, Response } from 'express'
import SeminarModel from '../models/Seminar'

// Отримати всі майбутні семінари
export const getFutureSeminars = async (
  req: Request,
  res: Response,
) => {
  try {
    const now = new Date()
    const seminars = await SeminarModel.find({
      'dates.date': { $gte: now },
    }).sort({ date: 1 })
    res.json({ success: true, seminars })
  } catch (error) {
    console.error('❌ Error fetching seminars:', error)
    res
      .status(500)
      .json({ success: false, message: 'Server error' })
  }
}

export const getSeminars = async (
  req: Request,
  res: Response,
) => {
  try {
    const seminars = await SeminarModel.find()
    res.json({ success: true, seminars })
  } catch (error) {
    console.error('❌ Error fetching all seminars:', error)
    res
      .status(500)
      .json({ success: false, message: 'Server error' })
  }
}
