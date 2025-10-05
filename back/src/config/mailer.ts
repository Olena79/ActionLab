import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config()

// Ініціалізація SendGrid
const apiKey = process.env.SENDGRID_API_KEY

if (!apiKey) {
  console.error('❌ SENDGRID_API_KEY не знайдено в .env')
} else {
  sgMail.setApiKey(apiKey)
  console.log('✅ SendGrid ініціалізовано')
}

export { sgMail }
