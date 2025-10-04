import { Request, Response } from 'express'
import { transporter } from '../config/mailer'
import { format } from 'date-fns'
import { uk } from 'date-fns/locale'

interface EmailPaymentStatusPayload {
  userData: {
    firstName: string
    lastName: string
    email: string
  }
  seminarData: {
    title: string
    date: string
  }
  status: 'success' | 'failed'
}

export const sendPaymentStatusEmail = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userData, seminarData, status } =
      req.body as Partial<EmailPaymentStatusPayload>

    if (!userData || !seminarData || !status) {
      return res.status(400).json({
        success: false,
        message: 'Missing userData, seminarData or status',
      })
    }

    const seminarDate = new Date(seminarData.date)
    const nextDay = new Date(seminarDate)
    nextDay.setDate(nextDay.getDate() + 1)

    const formattedDate = format(
      seminarDate,
      'dd.MM.yyyy',
      { locale: uk },
    )
    const formattedNextDay = format(nextDay, 'dd.MM.yyyy', {
      locale: uk,
    })

    const subject =
      status === 'success'
        ? `Оплата підтверджена: ${seminarData.title}`
        : `Помилка оплати: ${seminarData.title}`

    const html =
      status === 'success'
        ? `
        <p>Вітаємо, <b>${userData.firstName} ${userData.lastName}</b>!</p>
        <br />
        <p>Ваша оплата за семінар <b>${seminarData.title}</b> успішно підтверджена ✅</p>
        <br />
         <p>Дати проведення: <b>${formattedDate} - ${formattedNextDay}</b></p>
        <br />
        <p>Дякуємо за вашу довіру! Чекаємо вас на семінарі.</p>
        <br />
        <b><a href="${process.env.CLIENT_URL}" target="_blank" rel="noopener noreferrer">Сайт</a></b>&nbsp;&nbsp;
        <b><a href="${process.env.INSTA_URL}" target="_blank" rel="noopener noreferrer">Instagram</a></b>&nbsp;&nbsp;
        <b><a href="${process.env.FACEBOOK_URL}" target="_blank" rel="noopener noreferrer">Facebook</a></b>
      `
        : `
        <p>Шановний(а) <b>${userData.firstName} ${userData.lastName}</b>,</p>
        <br />
        <p>На жаль, під час обробки вашого платежу за семінар <b>${seminarData.title}</b> виникла помилка ❌</p>
        <br />
        <p>Будь ласка, зверніться до підтримки.</p>
        <br />
        <b><a href="${process.env.CLIENT_URL}" target="_blank" rel="noopener noreferrer">Сайт</a></b>&nbsp;&nbsp;
        <b><a href="${process.env.INSTA_URL}" target="_blank" rel="noopener noreferrer">Instagram</a></b>&nbsp;&nbsp;
        <b><a href="${process.env.FACEBOOK_URL}" target="_blank" rel="noopener noreferrer">Facebook</a></b>
      `

    await transporter.sendMail({
      from: `"ActionLab" <${process.env.SMTP_USER}>`,
      to: userData.email,
      subject,
      html,
    })

    return res.status(200).json({
      success: true,
      message: 'Status email sent successfully',
    })
  } catch (error) {
    console.error(
      '❌ Error sending payment status email:',
      error,
    )
    return res.status(500).json({
      success: false,
      message: 'Failed to send payment status email',
    })
  }
}
