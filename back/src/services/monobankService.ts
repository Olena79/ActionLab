import fetch from 'node-fetch'

export interface MonobankInvoicePayload {
  amount: number // сума у копійках
  ccy?: number // код валюти (за замовчуванням 980 — UAH)
  redirectUrl: string // URL для переадресації після оплати
  webHookUrl: string // URL для webhook
  merchantPaymInfo: {
    // Обов'язково
    description: string // опис платежу
    orderId: string // унікальний ID (e.g., payment._id)
  }
  validity?: number // секунди, default 24h
  paymentType?: 'debit' | 'hold' // default 'debit'
}

export interface MonobankInvoiceResponse {
  success: boolean
  invoiceId?: string
  invoiceUrl?: string
  message?: string
  raw?: string
}

export const createMonobankInvoiceApi = async (
  payload: MonobankInvoicePayload,
): Promise<MonobankInvoiceResponse> => {
  try {
    const response = await fetch(
      'https://api.monobank.ua/api/merchant/invoice/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': process.env
            .MONOBANK_API_TOKEN as string,
          'X-Cms': 'StuntSeminars', // замініть на вашу CMS
          'X-Cms-Version': '1.0', // версія вашої CMS
        },
        body: JSON.stringify({
          amount: payload.amount,
          ccy: payload.ccy || 980,
          redirectUrl: payload.redirectUrl,
          webHookUrl: payload.webHookUrl,
          validity: payload.validity || 259200, // 24h * 3
          merchantPaymInfo: {
            description:
              payload.merchantPaymInfo?.description ||
              'Оплата семінару',
            orderId: payload.merchantPaymInfo?.orderId,
          },
        }),
      },
    )

    const text = await response.text()
    console.log('Monobank response:', {
      status: response.status,
      text,
    })

    let data: any
    try {
      data = JSON.parse(text)
    } catch (err) {
      console.error(
        '❌ Не вдалося розпарсити JSON від Monobank:',
        err,
      )
      return {
        success: false,
        message: 'invalid_response',
        raw: text,
      }
    }

    if (response.ok && data.invoiceId && data.pageUrl) {
      return {
        success: true,
        invoiceId: data.invoiceId,
        invoiceUrl: data.pageUrl,
      }
    }

    return {
      success: false,
      message:
        data.errorDescription ||
        `http_error_${response.status}`,
      raw: text,
    }
  } catch (err) {
    console.error('❌ createMonobankInvoiceApi error:', err)
    return { success: false, message: 'network_error' }
  }
}
