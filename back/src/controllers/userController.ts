import { Request, Response } from 'express'
import { UserModel } from '../models/User'
// import {
//   scheduleDelayedPaymentEmail,
//   scheduleEmailWithoutPayment,
// } from './emailController'

interface RegisterSeminarPayload {
  title: string
  date: string // ISO string
  firstName: string
  lastName: string
  phone: string
  email: string
}

export const registerUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const payload = req.body as RegisterSeminarPayload
    const {
      title,
      date,
      firstName,
      lastName,
      phone,
      email,
    } = payload

    const userByEmail = await UserModel.findOne({ email })
    const userByPhone = await UserModel.findOne({ phone })

    if (
      userByEmail &&
      userByPhone &&
      String(userByEmail._id) !== String(userByPhone._id)
    ) {
      return res.status(200).json({
        success: false,
        message: 'email_phone_conflict',
        details: {
          emailOwnerId: userByEmail._id,
          phoneOwnerId: userByPhone._id,
        },
      })
    }

    if (userByEmail && !userByPhone) {
      return res.status(200).json({
        success: false,
        message: 'email_exists',
      })
    }

    if (userByPhone && !userByEmail) {
      return res.status(200).json({
        success: false,
        message: 'phone_exists',
      })
    }

    let user = userByEmail || userByPhone || null
    const seminarDate = new Date(date)

    if (user) {
      const alreadyRegistered = user.seminars.some(
        (s) =>
          s.title === title &&
          new Date(s.date).getTime() ===
            seminarDate.getTime(),
      )

      if (alreadyRegistered) {
        return res.status(200).json({
          success: false,
          message: 'already_registered',
        })
      }

      user.seminars.push({
        title,
        date: seminarDate,
        isPaid: false,
      })
    } else {
      user = new UserModel({
        firstName,
        lastName,
        phone,
        email,
        seminars: [
          { title, date: seminarDate, isPaid: false },
        ],
        language: 'ua',
      })
    }

    const savedUser = await user.save()
    const seminar = savedUser.seminars.find(
      (s) =>
        s.title === title &&
        new Date(s.date).getTime() ===
          seminarDate.getTime(),
    )

    if (!seminar) {
      return res.status(200).json({
        success: false,
        message: 'seminar_not_found',
      })
    }

    // Заплануємо лист
    // await scheduleDelayedPaymentEmail(
    //   savedUser._id.toString(),
    //   seminar._id!.toString(),
    //   40000, // тут підстав суму в копійках
    // )

    // Успіх
    return res.status(200).json({
      success: true,
      message: 'registered',
      userId: savedUser._id,
    })
  } catch (err: unknown) {
    console.error('❌ Помилка реєстрації на семінар:', err)

    // Якщо дубль унікального поля — повертаємо більш конкретний меседж
    const e = err as any
    if (e && e.code === 11000) {
      // визначимо яке поле викликало дубль
      const key = Object.keys(e.keyValue || {})[0]
      const map: Record<string, string> = {
        email: 'email_exists',
        phone: 'phone_exists',
      }
      const msg = map[key] || 'duplicate_key'
      return res
        .status(200)
        .json({ success: false, message: msg })
    }

    return res
      .status(500)
      .json({ success: false, message: 'server_error' })
  }
}
