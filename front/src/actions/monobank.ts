import {
	CreateInvoicePayload,
	CreateInvoiceResponse,
	GetPaymentStatusResponse,
} from '../types/paymentApi'
import api from './api'

/**
 * Створення інвойсу Monobank
 */
export async function createInvoice(
	payload: CreateInvoicePayload
): Promise<CreateInvoiceResponse> {
	try {
		const response = await api.post<CreateInvoiceResponse>(
			'/payments/create-monobank-invoice',
			payload
		)

		if (response.data.success) {
			return response.data
		} else {
			console.error('❌ Помилка створення інвойсу:', response.data.message)
			return {
				success: false,
				message: response.data.message || 'unknown_error',
			}
		}
	} catch (error) {
		console.error('❌ Помилка створення інвойсу Monobank:', error)
		return { success: false, message: 'network_error' }
	}
}

/**
 * Отримання статусу платежу
 */
export async function getPaymentStatus(
	paymentId: string
): Promise<GetPaymentStatusResponse> {
	try {
		const response = await api.get<GetPaymentStatusResponse>(
			`/payments/status/${paymentId}`
		)

		return response.data
	} catch (error: any) {
		console.error('❌ Помилка отримання статусу платежу:', error)

		if (error.response?.data) {
			return {
				success: false,
				message: error.response.data.message || 'server_error',
			}
		}

		return { success: false, message: 'network_error' }
	}
}

/**
 * Переклад помилок для відображення користувачу
 */
export function getPaymentErrorMessage(errorCode: string): string {
	const messages: Record<string, string> = {
		missing_required_fields: "Не вказані обов'язкові поля",
		invalid_user_id: 'Невірний ID користувача',
		invalid_seminar_id: 'Невірний ID семінару',
		invalid_amount: 'Невірна сума платежу',
		user_not_found: 'Користувача не знайдено',
		monobank_error: 'Помилка платіжної системи',
		api_token_missing: 'Помилка конфігурації платежів',
		network_error: "Помилка з'єднання. Спробуйте пізніше",
		server_error: 'Помилка сервера. Спробуйте пізніше',
		invalid_response: 'Некоректна відповідь від платіжної системи',
	}

	return messages[errorCode] || 'Невідома помилка'
}

/**
 * Переклад статусів платежу для відображення
 */
export function getPaymentStatusLabel(status: string): string {
	const labels: Record<string, string> = {
		created: 'Очікує оплати',
		processing: 'Обробляється',
		hold: 'Заблоковано',
		success: 'Оплачено успішно',
		failure: 'Помилка оплати',
		reversed: 'Скасовано',
		expired: 'Термін дії минув',
	}

	return labels[status] || 'Невідомий статус'
}

//====================================================

export interface TempPaymentPayload {
	userData: {
		firstName: string
		lastName: string
		phone: string
		email: string
	}
	seminarData: {
		_id?: string
		title: string
		date: string
	}
	invoiceUrl: string | null
}

interface TempPaymentResponse {
	success: boolean
	message?: string
}

export const sendPaymentEmail = async (
	payload: TempPaymentPayload
): Promise<TempPaymentResponse> => {
	try {
		console.log('Запит пішов')
		const response = await api.post<TempPaymentResponse>(
			'/payments/sendPaymentEmail',
			payload
		)
		console.log('Запит прийшов')
		return response.data
	} catch (error: any) {
		console.error('❌ Помилка відправки платіжного листа:', error)
		return {
			success: false,
			message: error?.response?.data?.message || 'network_error',
		}
	}
}
