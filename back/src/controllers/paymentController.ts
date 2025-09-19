import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { PaymentModel } from '../models/Payment'
import { createMonobankInvoiceApi } from '../services/monobankService'
import { UserModel } from '../models/User'
import { sendPaymentSuccessEmail } from './emailController'
import { format } from 'date-fns'
import { transporter } from '../config/mailer'

export const createMonobankInvoice = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      userId,
      seminarId,
      amount,
      currency = 'UAH',
    } = req.body

    // Перевірка ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res
        .status(400)
        .json({ success: false, message: 'invalid_userId' })
    if (!mongoose.Types.ObjectId.isValid(seminarId))
      return res.status(400).json({
        success: false,
        message: 'invalid_seminarId',
      })

    // Беремо назву семінару для description
    const user = await UserModel.findById(userId)
    const seminar = user?.seminars.find(
      (s) => s._id?.toString() === seminarId,
    )
    const description = seminar
      ? `Оплата за семінар: ${seminar.title}, сума: ${
          amount / 100
        } грн`
      : `Оплата семінару, сума: ${amount / 100} грн`

    // Виклик Monobank API
    const invoice = await createMonobankInvoiceApi({
      amount,
      currency,
      redirectUrl: `${process.env.CLIENT_URL}/?userId=${userId}&seminarId=${seminarId}`,
      webhookUrl: `${process.env.SERVER_URL}/payments/monobank/webhook`,
      description,
    })

    if (
      !invoice.success ||
      !invoice.invoiceUrl ||
      !invoice.invoiceId
    ) {
      return res
        .status(400)
        .json({ success: false, message: 'monobank_error' })
    }

    // Зберігаємо платіж у MongoDB
    await PaymentModel.create({
      userId: new mongoose.Types.ObjectId(userId),
      seminarId: new mongoose.Types.ObjectId(seminarId),
      amount,
      currency,
      invoiceId: invoice.invoiceId,
      invoiceUrl: invoice.invoiceUrl,
      status: 'pending',
    })

    // Повертаємо на фронт invoiceId і invoiceUrl
    res.json({
      success: true,
      invoiceId: invoice.invoiceId,
      invoiceUrl: invoice.invoiceUrl,
    })
  } catch (err) {
    console.error('❌ Помилка створення інвойсу:', err)
    res
      .status(500)
      .json({ success: false, message: 'server_error' })
  }
}

export const handleMonobankWebhook = async (
  req: Request,
  res: Response,
) => {
  try {
    const { invoiceId, status } = req.body
    if (!invoiceId) return res.sendStatus(400)

    if (status === 'success') {
      const payment = await PaymentModel.findOneAndUpdate(
        { invoiceId },
        { status: 'success' },
        { new: true },
      )

      if (payment) {
        const user = await UserModel.findById(
          payment.userId,
        )
        if (user) {
          const seminar = user.seminars.find(
            (s) =>
              s._id?.toString() ===
              payment.seminarId.toString(),
          )

          if (seminar) {
            // ✅ оновлюємо статус оплати
            seminar.isPaid = true
            await user.save()

            // ✅ надсилаємо лист
            await sendPaymentSuccessEmail(
              user.email,
              seminar,
            )
          }
        }
      }
    } else if (status === 'failed') {
      await PaymentModel.findOneAndUpdate(
        { invoiceId },
        { status: 'failed' },
      )
    }

    res.sendStatus(200)
  } catch (err) {
    console.error('❌ Webhook error:', err)
    res.sendStatus(500)
  }
}

export const getPaymentStatus = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId, seminarId } = req.query

    if (!userId || !seminarId)
      return res
        .status(400)
        .json({ success: false, message: 'missing_params' })

    const user = await UserModel.findById(userId)
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'user_not_found' })

    const seminar = user.seminars.find(
      (s) => s._id?.toString() === seminarId,
    )
    if (!seminar)
      return res.status(404).json({
        success: false,
        message: 'seminar_not_found',
      })

    res.json({
      success: true,
      isPaid: seminar.isPaid,
      title: seminar.title,
    })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ success: false, message: 'server_error' })
  }
}

//==================================================

interface TempPaymentPayload {
  userData: {
    firstName: string
    lastName: string
    phone: string
    email: string
  }
  seminarData: {
    title: string
    date: string
  }
}

export const sendTempPaymentEmail = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userData, seminarData } =
      req.body as TempPaymentPayload

    const seminarDate = new Date(seminarData.date)
    const nextDay = new Date(seminarDate)
    nextDay.setDate(nextDay.getDate() + 1)

    // Форматування дат у вигляді "дд.мм.рррр"
    const formattedDate = format(seminarDate, 'dd.MM.yyyy')
    const formattedNextDay = format(nextDay, 'dd.MM.yyyy')

    const mailOptions = {
      from: `"ActionLab" <${process.env.SMTP_USER}>`,
      to: userData.email,
      subject: `Реєстрація на семінар: ${seminarData.title}`,
      html: `
        <p>Вітаємо, <b>${userData.firstName} ${userData.lastName}</b>!</p>
        <br />
        <p>Ви успішно зареєстровані на семінар: <b>${seminarData.title}</b></p>
        <br />
        <p>Дати проведення: <b>${formattedDate} - ${formattedNextDay}</b></p>
        <br />
        <p>Будь ласка, здійсніть оплату на карту: <b>4149609017911431</b></p>
        <p>Отримувач: <b>Безверхній Андрій</b></p>
        <br />
        <p>Термін оплати: до <b>${formattedDate}</b></p>
        <br />
        <p>Дякуємо за довіру! Чекаємо на вас на семінарі.</p>
        <br />
        <b><a href="${process.env.CLIENT_URL}" target="_blank" rel="noopener noreferrer">Сайт</a></b>&nbsp;&nbsp;
        <b><a href="${process.env.INSTA_URL}" target="_blank" rel="noopener noreferrer">Instagram</a></b>&nbsp;&nbsp;
        <b><a href="${process.env.FACEBOOK_URL}" target="_blank" rel="noopener noreferrer">Facebook</a></b>
      `,
    }

    await transporter.sendMail(mailOptions)

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
