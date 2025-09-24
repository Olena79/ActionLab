import axios from 'axios'

const api = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:10000',
})

api.interceptors.response.use(
	response => response,
	error => {
		if (error.response) {
			// Сервер відповів з кодом помилки
			console.error(
				`❌ API Error ${error.response.status}:`,
				error.response.data?.message || error.message
			)
		} else if (error.request) {
			// Сервер не відповів
			console.error('❌ API No Response:', error.request)
		} else {
			// Щось пішло не так у самому запиті
			console.error('❌ API Setup Error:', error.message)
		}
		return Promise.reject(error)
	}
)

export default api
