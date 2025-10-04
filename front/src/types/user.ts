export interface IUserSeminar {
	_id?: string
	title: string
	description?: string
	date: Date
	isPaid: boolean
}

export interface IUser {
	_id: string
	firstName: string
	lastName: string
	phone: string
	email: string
	seminars: IUserSeminar[]
	language: 'ua' | 'en'
}
