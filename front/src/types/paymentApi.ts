export interface CreateInvoicePayload {
	membershipId: string
	userId: string
	amount: number // в копійках (наприклад, 500 грн = 50000)
	currency?: string // за замовчуванням UAH
}

export interface CreateInvoiceResponse {
	success: boolean
	invoiceId?: string
	invoiceUrl?: string // це pageUrl з бекенду, перейменовано для сумісності
	paymentId?: string // MongoDB _id платежу
	message?: string
}

export interface PaymentStatus {
	id: string
	status:
		| 'created'
		| 'processing'
		| 'hold'
		| 'success'
		| 'failure'
		| 'reversed'
		| 'expired'
	amount: number
	currency: string
	invoiceId: string
	reference?: string
	cardMask?: string
	paymentTime?: string
	createdAt: string
}

export interface GetPaymentStatusResponse {
	success: boolean
	payment?: PaymentStatus
	message?: string
}
