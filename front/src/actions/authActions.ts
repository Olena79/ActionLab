import { IUser } from '../types/user'
import api from './api'

export const registerUser = async (data: IUser) => {
	const response = await api.post('/users/register', data)
	return response.data
}
