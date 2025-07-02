import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:5000',
})

// Типи
interface RegisterPayload {
	name: string
	email: string
	password: string
	role: 'user' | 'coach'
	language: 'ua' | 'en'
}

interface RegisterResponse {
	message: string
}

export const registerUser = async (
	data: RegisterPayload
): Promise<RegisterResponse> => {
	const response = await api.post<RegisterResponse>('/auth/register', data)
	return response.data
}

export const verifyUser = async (token: string) => {
	const response = await api.get(`/auth/verify/${token}`)
	return response.data
}
