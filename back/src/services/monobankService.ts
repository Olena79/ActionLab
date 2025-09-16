import fetch from 'node-fetch'

export interface MonobankInvoicePayload {
  amount: number // у копійках, напр. 500 грн = 50000
  currency?: 'UAH' | 'USD' | 'EUR' // 'UAH' за замовчуванням
  redirectUrl: string // куди редіректити після оплати
  webhookUrl: string // для webhook Monobank
  description?: string // назва семінару або опис
}

export interface MonobankInvoiceResponse {
  success: boolean
  invoiceId?: string
  invoiceUrl?: string
  message?: string
}

// Створення інвойсу в Монобанк
export const createMonobankInvoiceApi = async (
  payload: MonobankInvoicePayload,
): Promise<MonobankInvoiceResponse> => {
  try {
    const response = await fetch(
      'https://api.monobank.ua/b2b/invoice',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': process.env
            .MONOBANK_API_TOKEN as string,
        },
        body: JSON.stringify({
          amount: payload.amount,
          currency: payload.currency || 'UAH',
          redirectUrl: payload.redirectUrl,
          webhookUrl: payload.webhookUrl,
          description:
            payload.description || 'Оплата семінару',
        }),
      },
    )

    const data = (await response.json()) as {
      invoiceId?: string
      invoiceUrl?: string
      message?: string
    }

    if (response.ok && data.invoiceId && data.invoiceUrl) {
      return {
        success: true,
        invoiceId: data.invoiceId,
        invoiceUrl: data.invoiceUrl,
      }
    }

    return {
      success: false,
      message: data.message || 'unknown_error',
    }
  } catch (err) {
    console.error('❌ createMonobankInvoiceApi error:', err)
    return { success: false, message: 'network_error' }
  }
}
