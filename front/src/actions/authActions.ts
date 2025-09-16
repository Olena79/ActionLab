import { RegisterSeminarPayload } from '../types/payloads'
import api from './api'

export const registerUser = async (data: RegisterSeminarPayload) => {
	const response = await api.post('/users/register', data)
	return response.data
}
