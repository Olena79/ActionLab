import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { PaymentModel } from '../models/Payment'
import {
  createMonobankInvoiceApi,
  MonobankInvoicePayload,
} from '../services/monobankService'
import { UserModel } from '../models/User'
import { format } from 'date-fns'
import { transporter } from '../config/mailer'
import { uk } from 'date-fns/locale'
import { sendPaymentStatusEmail } from '../services/sendPaymentStatusEmail'

export const createMonobankInvoice = async (
  req: Request,
  res: Response,
) => {
  console.log('Контроллер стартував createMonobankInvoice')
  try {
    const {
      userId,
      seminarId,
      seminarDate,
      amount,
      currency = 'UAH',
    } = req.body as {
      userId: string
      seminarId: string
      seminarDate: string
      amount: number
      currency?: string
    }

    const seminarDateObj = new Date(seminarDate)
    if (isNaN(seminarDateObj.getTime())) {
      return res
        .status(400)
        .json({ success: false, message: 'invalid_date' })
    }

    console.log('Дані з фронту:', userId, seminarId, amount)

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

    // Перевірка існування користувача
    const user = await UserModel.findById(userId)
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'user_not_found' })
    }

    console.log('Дані після перевірки:', userId, seminarId)

    // Генеруємо унікальний orderId
    const orderId = new mongoose.Types.ObjectId().toString()

    // Payload для Monobank
    const webhookUrl =
      process.env.BACKEND_PUBLIC_URL ||
      `${process.env.WEBHOOK_NGROK_URL}/payments/monobank/webhook`

    const monobankPayload: MonobankInvoicePayload = {
      amount,
      ccy: 980,
      merchantPaymInfo: {
        reference: orderId,
        destination: `Оплата семінару (ID: ${seminarId})`,
      },
      redirectUrl: `${
        process.env.FRONTEND_URL || 'http://localhost:3000'
      }/payment-success?paymentId=${orderId}`,
      webHookUrl: `${
        process.env.BACKEND_URL ||
        'https://actionlab.onrender.com'
      }/payments/monobank/webhook`,
      validity: 3600,
      paymentType: 'debit',
    }

    console.log('Підготовка інвойсу:', monobankPayload)

    // Виклик Monobank API
    const apiResponse = await createMonobankInvoiceApi(
      monobankPayload,
    )
    console.log('Відповідь Monobank API:', apiResponse)

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
      })
    }

    // Створюємо платіж
    const payment = new PaymentModel({
      userId,
      seminarId,
      amount,
      currency,
      status: 'pending',
      seminarDate: seminarDateObj,
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
  status: 'success' | 'failure' | 'created' | 'processing'
  modifiedDate: string
}

export const monobankWebhook = async (
  req: Request,
  res: Response,
) => {
  console.log(
    '🔔 Webhook received:',
    JSON.stringify(req.body, null, 2),
  )
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      console.error('❌ Webhook payload is empty')
      return res
        .status(400)
        .json({ success: false, message: 'empty_payload' })
    }

    const { invoiceId, status } =
      req.body as MonobankWebhookPayload
    if (!invoiceId || !status) {
      return res.status(400).json({
        success: false,
        message: 'invalid_payload',
      })
    }

    // Знаходимо платіж по invoiceId (це має бути у payment.invoiceId)
    const payment = await PaymentModel.findOne({
      invoiceId,
    })
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
    if (
      payment.status === mapMonoStatusToInternal(status)
    ) {
      console.log(
        'Webhook: статус не змінився, нічого не робимо',
      )
      return res.status(200).json({ success: true })
    }

    // Оновлюємо статус платежу
    payment.status = mapMonoStatusToInternal(status)
    await payment.save()
    console.log(
      'Webhook: payment updated:',
      payment._id.toString(),
      payment.status,
    )

    // Якщо успішний платіж — оновлюємо user.seminars.isPaid та надсилаємо email (один раз)
    if (payment.status === 'success') {
      // оновлюємо user семінар (шукаємо по seminars.seminarId)
      const updateResult = await UserModel.updateOne(
        {
          _id: payment.userId,
          'seminars.seminarId': payment.seminarId,
          'seminars.date': payment.seminarDate,
        },
        { $set: { 'seminars.$.isPaid': true } },
      )
      console.log(
        'Webhook: user seminar update result:',
        updateResult,
      )

      // Забираємо користувача і семінар для емейлу (якщо потрібно)
      const user = await UserModel.findById(payment.userId)
      const seminar = user?.seminars.find(
        (s) =>
          s.seminarId?.toString() ===
          String(payment.seminarId),
      )

      if (user && seminar) {
        try {
          await sendPaymentStatusEmail(
            {
              body: {
                userData: {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                },
                seminarData: {
                  title: seminar.title,
                  date: seminar.date,
                },
                status: 'success',
              },
            } as Request,
            {
              status: () => ({ json: () => null }),
            } as unknown as Response,
          )
          console.log('Webhook: payment status email sent')
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
  console.log('getPaymentStatus starts')
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
      console.log(
        'getPaymentStatus: found by _id:',
        !!payment,
      )
    }

    // 2) Якщо не знайдено — шукаємо по orderId
    if (!payment) {
      payment = await PaymentModel.findOne({
        orderId: param,
      })
      console.log(
        'getPaymentStatus: found by orderId:',
        !!payment,
      )
    }

    // 3) Якщо ще не знайдено — шукаємо по invoiceId
    if (!payment) {
      payment = await PaymentModel.findOne({
        invoiceId: param,
      })
      console.log(
        'getPaymentStatus: found by invoiceId:',
        !!payment,
      )
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
        seminarId: payment.seminarId,
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

//==================================================

interface EmailPaymentPayload {
  userData: {
    _id?: string
    firstName: string
    lastName: string
    phone: string
    email: string
  }
  seminarData: {
    _id?: string
    title: string
    date: string
  }
  invoiceUrl: string | null
}

export const sendPaymentEmail = async (
  req: Request,
  res: Response,
) => {
  console.log('Контроллер пошти стартував')
  try {
    const { userData, seminarData, invoiceUrl } =
      req.body as EmailPaymentPayload

    console.log(
      'З пошти: ',
      userData,
      seminarData,
      invoiceUrl,
    )

    if (!userData || !seminarData || !invoiceUrl) {
      return res.status(400).json({
        success: false,
        message:
          'Missing userData or seminarData or invoiceUrl',
      })
    }

    const seminarDate = new Date(seminarData.date)
    const nextDay = new Date(seminarDate)
    nextDay.setDate(nextDay.getDate() + 1)

    // Форматування дат у вигляді "дд.мм.рррр"
    const formattedDate = format(
      seminarDate,
      'dd.MM.yyyy',
      { locale: uk },
    )
    const formattedNextDay = format(nextDay, 'dd.MM.yyyy', {
      locale: uk,
    })

    const mailOptions = {
      from: `"ActionLab" <${process.env.SMTP_USER}>`,
      to: userData.email,
      subject: `Реєстрація на семінар: ${seminarData.title}`,
      html: `
        <p>Вітаємо, <b>${userData.firstName} ${userData.lastName}</b>!</p>
        <br />
        <p>Ваш запис на семінар <b>${seminarData.title}</b> успішно підтверджений</p>
        <br />
        <p>Дати проведення: <b>${formattedDate} - ${formattedNextDay}</b></p>
        <br />
        <p>Для завершення реєстрації, будь ласка, здійсніть оплату, натиснувши кнопку нижче:</p>
        <br />
        <a href="${invoiceUrl}" target="_blank" style="
          display:inline-block;
          padding:12px 20px;
          background:#4CAF50;
          color:white;
          text-decoration:none;
          border-radius:8px;
          font-weight:bold;
        ">
          Сплатити
        </a>
        <br /><br />
        
        <br />
        <p><b></b>Термін оплати: 24 години.</b> Якщо вам не вистачило часу, і платіж вже прострочений, повідомте нас за допомогою посилань нижче</b></p>
        <br />
        <p>Дякуємо за довіру! Чекаємо на вас на семінарі.</p>
        <br />
        <b><a href="${process.env.CLIENT_URL}" target="_blank" rel="noopener noreferrer">Сайт</a></b>&nbsp;&nbsp;
        <b><a href="${process.env.INSTA_URL}" target="_blank" rel="noopener noreferrer">Instagram</a></b>&nbsp;&nbsp;
        <b><a href="${process.env.FACEBOOK_URL}" target="_blank" rel="noopener noreferrer">Facebook</a></b>
      `,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Лист надіслано:', info.messageId)

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
