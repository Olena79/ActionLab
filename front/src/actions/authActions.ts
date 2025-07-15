import api from './api'

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
	user: AuthUser
	accessToken: string
	refreshToken: string
}

export const registerUser = async (
	data: RegisterPayload
): Promise<RegisterResponse> => {
	const response = await api.post<RegisterResponse>('/auth/register', data)
	// Зберігаємо токени
	localStorage.setItem('accessToken', response.data.accessToken)
	localStorage.setItem('refreshToken', response.data.refreshToken)
	return response.data
}

export const verifyUser = async (token: string) => {
	const response = await api.get<{
		message: string
		user: AuthUser
		accessToken: string
		refreshToken: string
	}>(`/auth/verify/${token}`)
	localStorage.setItem('accessToken', response.data.accessToken)
	localStorage.setItem('refreshToken', response.data.refreshToken)
	return response.data
}

// Витяг користувача (працює через api, токен додається автоматично)
export const fetchUser = async (
	accessToken: string
): Promise<AuthUser | null> => {
	try {
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
export const loginWithRefreshToken = async (refresh: string) => {
	const { data } = await api.post('/auth/token', {
		token: refresh,
	})

	localStorage.setItem('accessToken', data.accessToken)
	localStorage.setItem('refreshToken', data.refreshToken)

	const user = await fetchUser(data.accessToken)
	if (!user) throw new Error('User not found')

	return {
		user,
		accessToken: data.accessToken,
		refreshToken: data.refreshToken,
	}
}

export const loginUser = async (email: string, password: string) => {
	const response = await api.post(
		`${process.env.REACT_APP_SERVER_URL}/auth/login`,
		{ email, password }
	)
	localStorage.setItem('accessToken', response.data.accessToken)
	localStorage.setItem('refreshToken', response.data.refreshToken)
	return response.data // очікуємо: { user, accessToken, refreshToken }
}
