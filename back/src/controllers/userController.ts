import { Request, Response } from 'express'
import { UserModel } from '../models/User'
import mongoose from 'mongoose'

interface RegisterSeminarPayload {
  _id?: string
  date: Date
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
    const { date, firstName, lastName, phone, email } =
      payload

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

    if (user) {
      user.membership.push({
        invoiceDate: new Date(),
        isPaid: false,
      })
    } else {
      user = new UserModel({
        firstName,
        lastName,
        phone,
        email,
        date,
        membership: [
          {
            invoiceDate: new Date(),
            isPaid: false,
          },
        ],
      })
    }

    const savedUser = await user.save()
    const lastMembership =
      user.membership[user.membership.length - 1]

    // Успіх
    return res.status(200).json({
      success: true,
      message: 'registered',
      userId: savedUser._id,
      membershipId: lastMembership._id,

      user: {
        _id: savedUser._id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        phone: savedUser.phone,
        email: savedUser.email,
      },
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
