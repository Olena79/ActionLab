import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { PaymentModel } from '../models/Payment'
import {
  createMonobankInvoiceApi,
  MonobankInvoicePayload,
} from '../services/monobankService'
import { UserModel } from '../models/User'
import { addDays, format } from 'date-fns'
import { sgMail } from '../config/mailer'
import { uk } from 'date-fns/locale'
import { sendPaymentStatusEmail } from '../services/sendPaymentStatusEmail'

export const createMonobankInvoice = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      membershipId,
      userId,
      amount,
      currency = 'UAH',
    } = req.body as {
      userId: string
      amount: number
      currency?: string
      membershipId: string
    }

    // Перевірка ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res
        .status(400)
        .json({ success: false, message: 'invalid_userId' })

    // Перевірка існування користувача
    const user = await UserModel.findById(userId)
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'user_not_found' })
    }

    // Генеруємо унікальний orderId
    const orderId = new mongoose.Types.ObjectId().toString()

    const monobankPayload: MonobankInvoicePayload = {
      amount,
      ccy: 980,
      merchantPaymInfo: {
        reference: orderId,
        destination: `Оплата абонементу на місяць (ID: ${orderId}&&&${membershipId})`,
      },
      redirectUrl: `${
        process.env.FRONTEND_URL || 'http://localhost:3000'
      }/payment-success?paymentId=${orderId}`,
      webHookUrl: `${
        process.env.WEBHOOK_NGROK_URL ||
        process.env.BACKEND_URL ||
        'https://actionlab.onrender.com'
      }/payments/monobank/webhook`,
      validity: 3600,
      paymentType: 'debit',
    }

    // Виклик Monobank API
    const apiResponse = await createMonobankInvoiceApi(
      monobankPayload,
    )

    // Перевіряємо валідність відповіді
    if (
      !apiResponse.success ||
      !apiResponse.invoiceId ||
      !apiResponse.invoiceUrl
    ) {
      console.error(
        '❌ Mono API error:',
        apiResponse.message,
        apiResponse.raw,
      )
      return res.status(400).json({
        success: false,
        message: apiResponse.message || 'monobank_error',
        raw: apiResponse.raw,
      })
    }

    // Перевірка дублю
    const already = await PaymentModel.findOne({
      $or: [
        { invoiceId: apiResponse.invoiceId },
        { orderId },
      ],
    })
    if (already) {
      return res.json({
        success: true,
        invoiceId: already.invoiceId,
        invoiceUrl: already.invoiceUrl,
        paymentId: already._id.toString(),
        membershipId: already.membershipId.toString(),
      })
    }

    // Створюємо платіж
    const payment = new PaymentModel({
      membershipId,
      userId,
      amount,
      currency,
      status: 'pending',
      invoiceId: apiResponse.invoiceId,
      invoiceUrl: apiResponse.invoiceUrl,
      orderId,
    })
    await payment.save()

    return res.json({
      success: true,
      invoiceId: apiResponse.invoiceId,
      invoiceUrl: apiResponse.invoiceUrl,
      paymentId: payment._id.toString(),
      membershipId: payment.membershipId.toString(),
    })
  } catch (err) {
    console.error('❌ Помилка створення інвойсу:', err)
    res
      .status(500)
      .json({ success: false, message: 'server_error' })
  }
}

interface MonobankWebhookPayload {
  invoiceId: string
  reference?: string
  status: 'success' | 'failure' | 'created' | 'processing'
  modifiedDate: string
}

export const monobankWebhook = async (
  req: Request,
  res: Response,
) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      console.error('❌ Webhook payload is empty')
      return res
        .status(400)
        .json({ success: false, message: 'empty_payload' })
    }

    const { invoiceId, reference, status } =
      req.body as MonobankWebhookPayload
    if (!status || (!invoiceId && !reference)) {
      return res.status(400).json({
        success: false,
        message: 'invalid_payload',
      })
    }

    // Знаходимо платіж по invoiceId (це має бути у payment.invoiceId)
    let payment = await PaymentModel.findOne({
      invoiceId,
    })
    if (!payment && reference) {
      payment = await PaymentModel.findOne({
        orderId: reference,
      })
    }
    if (!payment) {
      console.warn(
        '❌ Webhook: payment not found for invoiceId',
        invoiceId,
      )
      return res.status(404).json({
        success: false,
        message: 'payment_not_found',
      })
    }

    // Якщо статус не змінився — просто відповідаємо 200 (idempotency)
    const newStatus = mapMonoStatusToInternal(status)
    if (payment.status === newStatus) {
      return res.status(200).json({ success: true })
    }

    // Оновлюємо статус платежу
    payment.status = newStatus
    await payment.save()

    // Якщо успішний платіж — оновлюємо isPaid та надсилаємо email (один раз)
    if (payment.status === 'success') {
      const userResult = await UserModel.findById(
        payment.userId,
      )
      if (userResult && payment.membershipId) {
        // Знайти потрібний membership за membershipId
        const targetMembership = userResult.membership.find(
          (m) =>
            m._id?.toString() ===
            payment.membershipId.toString(),
        )

        if (targetMembership) {
          targetMembership.isPaid = true
          await userResult.save()
        } else {
          console.warn(
            `⚠️ Membership ${payment.membershipId} не знайдено у користувача ${userResult._id}`,
          )
        }
      }

      // Забираємо користувача для емейлу (якщо потрібно)
      const user = await UserModel.findById(payment.userId)

      if (user && payment.status === 'success') {
        try {
          await sendPaymentEmail(
            {
              body: {
                userData: {
                  _id: user._id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                },
                status: 'success',
              },
            } as Request,
            {
              status: () => ({ json: () => null }),
            } as unknown as Response,
          )
        } catch (errEmail) {
          console.error(
            'Webhook: error sending status email:',
            errEmail,
          )
        }
      }
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('❌ Помилка в webhook:', err)
    return res
      .status(500)
      .json({ success: false, message: 'server_error' })
  }
}

//==================================================

interface EmailPaymentPayload {
  userData: {
    _id?: string
    firstName: string
    lastName: string
    phone: string
    email: string
  }
  membershipId?: string
  invoiceUrl: string | null
}

export const sendPaymentEmail = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userData } = req.body as EmailPaymentPayload

    if (!userData) {
      return res.status(400).json({
        success: false,
        message: 'Missing userData',
      })
    }

    const mailOptions = {
      from: {
        email: process.env.SMTP_USER!,
        name: 'ActionLab',
      },
      to: userData.email,
      subject: 'Оплата здійснена!',
      html: `
        <p>Вітаємо, <b>${userData.firstName} ${userData.lastName}</b>!</p>
        <br />
        <p>Ви щойно оплатили абонемент на групові заняття(на один місяць)</p>
        <br />
        
        <br />
        <p>Дякуємо за довіру! Чекаємо на вас в залі.</p>
        <br />
        <b><a href="${process.env.CLIENT_URL}" target="_blank" rel="noopener noreferrer">Сайт</a></b>&nbsp;&nbsp;
        <b><a href="${process.env.INSTA_URL}" target="_blank" rel="noopener noreferrer">Instagram</a></b>&nbsp;&nbsp;
        <b><a href="${process.env.TELEGRAM_URL}" target="_blank" rel="noopener noreferrer">Telegram</a></b>
      `,
    }

    await sgMail.send(mailOptions)

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    })
  } catch (error) {
    console.error(
      '❌ Error sending temp payment email:',
      error,
    )
    return res.status(500).json({
      success: false,
      message: 'Failed to send email',
    })
  }
}

//=============================

function mapMonoStatusToInternal(
  status: string,
): 'pending' | 'success' | 'failed' {
  if (status === 'success') return 'success'
  if (status === 'failure') return 'failed'
  // created/processing -> pending
  return 'pending'
}

export const getPaymentStatus = async (
  req: Request,
  res: Response,
) => {
  try {
    const param = req.params.paymentId
    if (!param)
      return res.status(400).json({
        success: false,
        message: 'missing_paymentId',
      })

    let payment = null

    // 1) Якщо валідний ObjectId — шукаємо по _id
    if (mongoose.Types.ObjectId.isValid(param)) {
      payment = await PaymentModel.findById(param)
    }

    // 2) Якщо не знайдено — шукаємо по orderId
    if (!payment) {
      payment = await PaymentModel.findOne({
        orderId: param,
      })
    }

    // 3) Якщо ще не знайдено — шукаємо по invoiceId
    if (!payment) {
      payment = await PaymentModel.findOne({
        invoiceId: param,
      })
    }

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'payment_not_found',
      })
    }

    // Повертаємо зручний payload фронту
    return res.json({
      success: true,
      payment: {
        _id: payment._id,
        status: payment.status,
        amount: payment.amount,
        currency: payment.currency,
        userId: payment.userId,
        invoiceId: payment.invoiceId,
        invoiceUrl: payment.invoiceUrl,
        orderId: payment.orderId,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
        isPaid: payment.status === 'success',
      },
    })
  } catch (err) {
    console.error('getPaymentStatus error', err)
    return res
      .status(500)
      .json({ success: false, message: 'server_error' })
  }
}
