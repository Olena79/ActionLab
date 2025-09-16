import api from './api'

export interface CreateInvoicePayload {
	userId: string
	seminarId: string
	amount: number // в копійках (наприклад, 500 грн = 50000)
	currency?: string // за замовчуванням UAH
}

export interface CreateInvoiceResponse {
	success: boolean
	invoiceUrl?: string
	message?: string
}

export async function createMonobankInvoice(
	payload: CreateInvoicePayload
): Promise<CreateInvoiceResponse> {
	try {
		const response = await api.post<CreateInvoiceResponse>(
			'/payments/monobank',
			payload
		)

		return response.data
	} catch (error) {
		console.error('❌ Помилка створення інвойсу Monobank:', error)
		return { success: false, message: 'network_error' }
	}
}

export interface PaymentStatusResponse {
	success: boolean
	isPaid?: boolean
	title?: string
	message?: string
}

export const getPaymentStatus = async (
	userId: string,
	seminarId: string
): Promise<PaymentStatusResponse> => {
	try {
		const response = await api.get<PaymentStatusResponse>('/payments/status', {
			params: { userId, seminarId },
		})
		return response.data
	} catch (error: any) {
		console.error('❌ Помилка отримання статусу оплати:', error)
		return {
			success: false,
			message: error?.response?.data?.message || 'network_error',
		}
	}
}
