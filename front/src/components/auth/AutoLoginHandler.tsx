import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { loginWithRefreshToken } from '../../actions/authActions'

const AutoLoginHandler = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { login, setTokens } = useAuth()

	useEffect(() => {
		if (location.pathname.startsWith('/verify')) return
		console.log('location.pathname from AutoLoginHandler: ', location.pathname)

		const url = new URLSearchParams(location.search)
		const refresh = url.get('refresh')

		const handleLogin = async () => {
			try {
				if (refresh) {
					const { user, accessToken, refreshToken } =
						await loginWithRefreshToken(refresh)
					setTokens(accessToken, refreshToken)
					login(user)
					navigate('/', { replace: true })
				}
			} catch (err) {
				console.error('❌ Auto-login error:', err)
			}
		}
		handleLogin()
	}, [location.search, location.pathname, login, navigate, setTokens])

	return null
}

export default AutoLoginHandler
