import api from './api'

export interface Seminar {
	_id: string
	title: string
	description?: string
	date: string
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
