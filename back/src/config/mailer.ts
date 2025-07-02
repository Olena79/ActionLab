import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { emailMessages, confirmationMessages } from './i18n'

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
  const verifyUrl = `${process.env.CLIENT_URL}/verify/${token}`
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
