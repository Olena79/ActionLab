export interface ISeminar {
	_id: string
	title: string
	description?: string
	date: string // ISO string
}

export interface RegisterSeminarPayload {
	title: string
	date: string
	firstName: string
	lastName: string
	phone: string
	email: string
	isPaid: boolean
}

export interface InfoMessage {
	title: string
	message1: string
	message2: string
	showPayButton?: boolean
	onPay?: () => void
}
