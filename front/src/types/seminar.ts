export interface ISeminar {
	_id: string
	title: string
	description?: string
	dates: { date: string; date2: string }[]
	// нове поле для вибраної дати
	selectedDate?: { date: string; date2: string }
}

export interface RegisterSeminarPayload {
	title: string
	date: string
	firstName: string
	lastName: string
	phone: string
	email: string
	isPaid: boolean
	seminarId: string
}

export interface InfoMessage {
	title: string
	title2?: string
	title3?: string
	title4?: string
	message1: string
	message2: string
	showPayButton?: boolean
	onPay?: () => void
	userData?: {
		_id?: string
		firstName: string
		lastName: string
		phone: string
		email: string
	}
	seminarData?: {
		_id?: string
		title: string
		date: string
	}
	userId?: string
}
