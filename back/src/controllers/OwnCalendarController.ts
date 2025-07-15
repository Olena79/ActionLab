import { NextFunction, Request, Response } from 'express'
import OwnCalendarModel from '../models/OwnCalendarModel'
import { OwnCalendarValidator } from '../validators/OwnCalendarValidator'

export const createCalendarEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const parsed = OwnCalendarValidator.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({
      message: 'Invalid input',
      errors: parsed.error.flatten().fieldErrors,
    })
    return
  }
  console.log('parsed from createCalendarEvent: ', parsed)

  const { dates, type, title, description } = parsed.data
  console.log(
    'parsed.data from createCalendarEvent: ',
    parsed.data,
  )

  try {
    const newEvent = await OwnCalendarModel.create({
      dates,
      type,
      title,
      description,
      userId: req.userId,
    })
    console.log(
      'newEvent from createCalendarEvent: ',
      newEvent,
    )
    res
      .status(201)
      .json({ message: 'Event created', event: newEvent })
  } catch (err) {
    console.error('❌ Error creating event:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getOwnCalendarEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const events = await OwnCalendarModel.find().sort({
      dates: 1,
    })

    console.log(
      'events from getOwnCalendarEvents: ',
      events,
    )

    res.status(200).json({ events })
  } catch (err) {
    console.error('❌ Error fetching events:', err)
    res.status(500).json({ message: 'Server error' })
  }
}
