import { Router } from 'express'
import {
  createMonobankInvoice,
  getPaymentStatus,
  monobankWebhook,
  sendPaymentEmail,
} from '../controllers/paymentController'
import { createInvoiceValidator } from '../validators/paymentValidator'

const router = Router()

router.post(
  '/create-monobank-invoice',
  createInvoiceValidator,
  createMonobankInvoice,
)

router.post('/monobank/webhook', monobankWebhook)
router.get('/status/:paymentId', getPaymentStatus)
router.post('/sendPaymentEmail', sendPaymentEmail)

export default router
