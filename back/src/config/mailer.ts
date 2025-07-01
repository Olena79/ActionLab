import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { emailMessages } from './i18n'

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
    from: '"StuntFactory" <SF@stuntfactory.com>',
    to,
    subject: content.subject,
    html: `
      <h2>${content.title}</h2>
      <p>Натисніть кнопку нижче, щоб підтвердити email:</p>
      <a href="${verifyUrl}" target="_blank" 
        style="display:inline-block;padding:10px 20px;background:#1976d2;color:#fff;text-decoration:none;border-radius:5px;">
        ${content.button}
      </a>
      <p>${content.alt}<br/>${verifyUrl}</p>
    `,
  })
}
