import { Request, Response } from 'express'
import { UserModel } from '../models/User'
import {
  scheduleDelayedPaymentEmail,
  scheduleEmailWithoutPayment,
} from './emailController'

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

    // 1) знаходимо по email і по phone окремо
    const userByEmail = await UserModel.findOne({ email })
    const userByPhone = await UserModel.findOne({ phone })

    // 2) якщо email і phone належать різним користувачам — конфлікт
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

    // 3) якщо є користувач тільки за email (і phone від іншого відсутній) — повідомляємо про конфлікт
    if (userByEmail && !userByPhone) {
      // можливо користувач намагається зареєструватися з іншим телефоном, але з тією ж поштою
      return res.status(200).json({
        success: false,
        message: 'email_exists',
      })
    }

    // 4) якщо є користувач тільки за phone (і email відсутній) — повідомляємо про конфлікт
    if (userByPhone && !userByEmail) {
      return res.status(200).json({
        success: false,
        message: 'phone_exists',
      })
    }

    // Тепер: або нікого не знайшли (новий користувач), або знайшли одного користувача (userByEmail || userByPhone) — це один і той самий user
    let user = userByEmail || userByPhone || null
    const seminarDate = new Date(date)

    // Перевіримо, чи вже зареєстрований (для існуючого користувача)
    if (user) {
      const alreadyRegistered = user.seminars.some(
        (s) =>
          s.title === title &&
          // порівнюємо по ms
          new Date(s.date).getTime() ===
            seminarDate.getTime(),
      )

      if (alreadyRegistered) {
        return res.status(200).json({
          success: false,
          message: 'already_registered',
        })
      }

      // якщо не зареєстрований — додаємо семінар
      user.seminars.push({
        title,
        date: seminarDate,
        isPaid: false,
      })
    } else {
      // Новий користувач
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

    // Зберігаємо (якщо щось пішло не так, впаде у catch)
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
    await scheduleDelayedPaymentEmail(
      savedUser._id.toString(),
      seminar._id!.toString(),
      40000, // <-- тут підстав свою суму
    )

    // Успіх
    return res.status(200).json({
      success: true,
      message: 'registered',
      userId: savedUser._id,
    })
  } catch (err: unknown) {
    console.error('❌ Помилка реєстрації на семінар:', err)

    // Якщо дубль унікального поля — повертаємо більш конкретний меседж
    // (опціонально)
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
