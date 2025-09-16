import { Request, Response } from 'express'
import SeminarModel from '../models/Seminar'

// Отримати всі майбутні семінари
export const getFutureSeminars = async (
  req: Request,
  res: Response,
) => {
  try {
    console.log('Controller starts')
    const now = new Date()
    console.log('Now:', now)
    const seminars = await SeminarModel.find({
      date: { $gte: now },
    }).sort({ date: 1 })
    res.json({ success: true, seminars })

    console.log('Controller get seminars: ', seminars)
  } catch (error) {
    console.error('❌ Error fetching seminars:', error)
    res
      .status(500)
      .json({ success: false, message: 'Server error' })
  }
}
