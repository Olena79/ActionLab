import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { emailMessages, confirmationMessages } from './i18n'
import { IUser } from 'models/User'

dotenv.config()

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const sendVerificationEmail = async (
  to: string,
  token: string,
  lang: 'ua' | 'en' = 'ua',
) => {
  const verifyUrl = `${process.env.CLIENT_URL}/verify?token=${token}`
  const content = emailMessages[lang] || emailMessages.ua

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: content.subject,
    html: `
      <h2>${content.title}</h2>
      <p>${content.text}</p>
      <a href="${verifyUrl}" target="_blank" 
        style="display:inline-block;padding:10px 20px;background:#1976d2;color:#fff;text-decoration:none;border-radius:5px;">
        ${content.button}
      </a>
      <p>${content.alt}<br/>${verifyUrl}</p>
    `,
  })
}

export const sendConfirmationEmail = async (
  to: string,
  lang: 'ua' | 'en' = 'ua',
) => {
  const content =
    confirmationMessages[lang] || confirmationMessages.ua

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: content.subject,
    html: `
      <h2>${content.title}</h2>
      <p>${content.text}</p>
      <p>${content.footer}</p>
      <p><a href="${process.env.CLIENT_URL}" target="_blank" style="color:#1976d2; text-decoration:none;">Перейти на головну сторінку</a></p>
    `,
  })
}

export const sendCoachApprovalRequest = async (
  user: IUser,
  language: 'ua' | 'en',
) => {
  const approveUrl = `${process.env.SERVER_URL}/auth/approve-coach/${user.verifyToken}`
  const rejectUrl = `${process.env.SERVER_URL}/auth/reject-coach/${user.verifyToken}`

  const subject =
    language === 'ua'
      ? 'Новий запит на реєстрацію тренера'
      : 'New Coach Registration Request'
  const html = `
    <p>${user.name} (${user.email}) хоче стати тренером.</p>
    <p>
      <a href="${approveUrl}">✅ Підтвердити</a> |
      <a href="${rejectUrl}">❌ Скасувати</a>
    </p>
  `
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    subject,
    html,
  })
}

export const sendErrorNotificationToAdmin = async (
  subject: string,
  error: Error | string,
  context?: string,
) => {
  const html = `
    <h2>❌ Помилка на сервері</h2>
    ${
      context
        ? `<p><strong>Контекст:</strong> ${context}</p>`
        : ''
    }
    <p><strong>Повідомлення:</strong> ${
      typeof error === 'string' ? error : error.message
    }</p>
    <pre>${
      typeof error === 'string' ? '' : error.stack
    }</pre>
  `

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    subject,
    html,
  })
}

export const sendRejectionCoachEmail = async (
  email: string,
  language: 'ua' | 'en',
) => {
  const subject =
    language === 'ua'
      ? 'Відмова у реєстрації як тренера'
      : 'Coach Registration Rejected'

  const html =
    language === 'ua'
      ? `
        <p>Дякуємо за спробу зареєструватися як тренер.</p>
        <p>На жаль, ваш запит було відхилено.</p>
        <p>Ваш обліковий запис видалено, однак ви можете <a href="${process.env.CLIENT_URL}/register">зареєструватися знову</a> як звичайний користувач.</p>
      `
      : `
        <p>Thank you for applying to become a coach.</p>
        <p>Unfortunately, your request has been rejected.</p>
        <p>Your account has been deleted, but you can <a href="${process.env.CLIENT_URL}/register">register again</a> as a regular user.</p>
      `

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject,
    html,
  })
}
