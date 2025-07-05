import axios from 'axios'

const api = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
})

// Типи
export interface AuthUser {
	id: string
	email: string
	name: string
	role: 'user' | 'coach' | 'admin'
	verified: boolean
}

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
	const response = await api.get<{
		message: string
		user: AuthUser
		accessToken: string
		refreshToken: string
	}>(`/auth/verify/${token}`)
	return response.data
}

export const fetchUser = async (
	accessToken: string
): Promise<AuthUser | null> => {
	try {
		console.log('🔑 Access token in fetchUser:', accessToken)
		const res = await api.get('/auth/private', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})

		const data = res.data
		return {
			id: data.userId,
			email: data.email,
			name: data.name,
			role: data.role,
			verified: data.verified,
		}
	} catch (error) {
		console.error('❌ Failed to fetch user:', error)
		return null
	}
}

// Дія для автологіну через refreshToken
export const loginWithRefreshToken = async (
	refreshToken: string
): Promise<{ user: AuthUser; accessToken: string; refreshToken: string }> => {
	const { data } = await axios.post(
		`${process.env.REACT_APP_SERVER_URL}/auth/token`,
		{ token: refreshToken }
	)

	const user = await fetchUser(data.accessToken)
	if (!user) throw new Error('User not found')

	return {
		user,
		accessToken: data.accessToken,
		refreshToken: data.refreshToken,
	}
}
