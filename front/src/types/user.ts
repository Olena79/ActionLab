export interface IUserSeminar {
	seminarId: string
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
