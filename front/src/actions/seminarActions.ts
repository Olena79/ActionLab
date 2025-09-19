import api from './api'

export interface Seminar {
	_id: string
	title: string
	description?: string
	dates: {
		date: string
		date2: string
	}[]
	duration?: string
	instructor?: string
	fullDescription?: string
	price?: string
	modules?: [
		{
			title: string
			description?: string
			fullDescription?: string[]
		}
	]
	resultInfo?: string
}

export interface SeminarResponse {
	success: boolean
	seminars: Seminar[]
	message?: string
}

export const getFutureSeminars = async (): Promise<Seminar[]> => {
	const response = await api.get<SeminarResponse>('/seminar/future')
	if (response.data.success) {
		return response.data.seminars
	}
	throw new Error(response.data.message || 'Failed to fetch seminars')
}

export const getSeminars = async (): Promise<Seminar[]> => {
	const response = await api.get<SeminarResponse>('/seminar/all')
	if (response.data.success) {
		return response.data.seminars
	}
	throw new Error(response.data.message || 'Failed to fetch seminars')
}
