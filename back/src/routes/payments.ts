import { Router } from 'express'
import {
  createMonobankInvoice,
  getPaymentStatus,
  handleMonobankWebhook,
  sendTempPaymentEmail,
} from '../controllers/paymentController'
import { createInvoiceValidator } from '../validators/paymentValidator'

const router = Router()

router.post(
  '/monobank',
  createInvoiceValidator,
  createMonobankInvoice,
)

router.post('/monobank/webhook', handleMonobankWebhook)
router.get('/status', getPaymentStatus)
router.post('/sendTempPaymentEmail', sendTempPaymentEmail)

export default router
