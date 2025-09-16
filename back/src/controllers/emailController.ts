import { IUserSeminar, UserModel } from '../models/User'
import { transporter } from '../config/mailer'
import mongoose from 'mongoose'
import { createMonobankInvoiceApi } from '../services/monobankService'
import nodemailer from 'nodemailer'

export const scheduleDelayedPaymentEmail = async (
  userId: string,
  seminarId: string,
  amount: number,
) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) return
  if (!mongoose.Types.ObjectId.isValid(seminarId)) return

  const user = await UserModel.findById(userId)
  const seminar = user?.seminars.find(
    (s) => s._id?.toString() === seminarId,
  )
  if (!user || !seminar) return

  // Створюємо інвойс Monobank
  const invoice = await createMonobankInvoiceApi({
    amount,
    currency: 'UAH',
    redirectUrl: `${process.env.CLIENT_URL}/payment-success`,
    webhookUrl: `${process.env.SERVER_URL}/payments/monobank/webhook`,
    description: `Оплата семінару: ${seminar.title}`,
  })
  if (!invoice.success || !invoice.invoiceUrl) return

  // Таймер 10 хв
  setTimeout(async () => {
    const freshUser = await UserModel.findById(userId)
    const freshSeminar = freshUser?.seminars.find(
      (s) => s._id?.toString() === seminarId,
    )

    if (freshSeminar && !freshSeminar.isPaid) {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user.email,
        subject: `Нагадування про оплату семінару ${seminar.title}`,
        html: `
          <p>Ваше місце на семінарі ще не підтверджено оплатою.</p>
          <p>Натисніть нижче, щоб завершити оплату:</p>
          <a href="${invoice.invoiceUrl}" target="_blank">Оплатити зараз</a>
        `,
      })
    }
  }, 600_000) // 10 хв
}
interface DelayedPaymentRequestBody {
  userId: string
  seminarId: string
  amount: number
}

export const scheduleEmailWithoutPayment = async (
  req: Request,
  res: Response,
) => {
  const body =
    req.body as unknown as DelayedPaymentRequestBody
  const { userId, seminarId, amount } = body
  scheduleDelayedPaymentEmail(userId, seminarId, amount)
}

export const sendPaymentSuccessEmail = async (
  to: string,
  seminar: IUserSeminar,
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // або smtp твого провайдера
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const mailOptions = {
    from: `"Seminars" <${process.env.SMTP_USER}>`,
    to,
    subject: `Оплата підтверджена: ${seminar.title}`,
    html: `
      <h2>Вітаємо! 🎉</h2>
      <p>Ви успішно оплатили участь у семінарі <b>${
        seminar.title
      }</b>.</p>
      <p>${seminar.description || ''}</p>
      <p>
        Ви можете повернутися на сайт за цим посиланням:  
        <a href="${
          process.env.CLIENT_URL
        }" target="_blank">${process.env.CLIENT_URL}</a>
      </p>
      <br/>
      <p>Дякуємо за довіру 🙏</p>
    `,
  }

  await transporter.sendMail(mailOptions)
}
