import { IUser } from './user'

export interface RegisterSeminarPayload {
	title: string
	date: string
	firstName: string
	lastName: string
	phone: string
	email: string
	isPaid: boolean
}

export interface RegisterSeminarResponse {
	success: boolean
	message: string
	user?: IUser
}
