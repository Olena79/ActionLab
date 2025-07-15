import axios from 'axios'

const api = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
})

// Локальні змінні токенів
let accessToken = localStorage.getItem('accessToken')
let refreshToken = localStorage.getItem('refreshToken')

// 👉 Додаємо токен до кожного запиту
api.interceptors.request.use(config => {
	const token = localStorage.getItem('accessToken')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

// 👉 Перехоплюємо 401 помилки та оновлюємо токен
api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			refreshToken
		) {
			originalRequest._retry = true
			try {
				const res = await axios.post(
					`${process.env.REACT_APP_SERVER_URL}/auth/token`,
					{ token: localStorage.getItem('refreshToken') }
				)

				const newAccess = res.data.accessToken
				const newRefresh = res.data.refreshToken

				// Зберігаємо нові токени
				if (newAccess) localStorage.setItem('accessToken', newAccess)
				if (newRefresh) localStorage.setItem('refreshToken', newRefresh)

				// Додаємо оновлений токен до повторного запиту
				originalRequest.headers.Authorization = `Bearer ${accessToken}`
				return api(originalRequest)
			} catch (err) {
				console.error('🔐 Refresh token failed', err)
				localStorage.removeItem('accessToken')
				localStorage.removeItem('refreshToken')
				window.location.href = '/' // або редірект на твій роут
				return Promise.reject(err)
			}
		}

		return Promise.reject(error)
	}
)

export default api
