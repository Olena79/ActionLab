import React, { useEffect, useState } from 'react'
import { verifyUser } from '../actions/authActions'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../translation/TranslationContext'

const VerifyPage: React.FC = () => {
	const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
		'loading'
	)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const { login, setTokens } = useAuth()
	const navigate = useNavigate()
	const { t } = useTranslation()

	useEffect(() => {
		const token = new URLSearchParams(window.location.search).get('token')
		if (!token) {
			setStatus('error')
			setErrorMessage('Token not found')
			return
		}
		console.log('Token from URL: ', token)

		const verify = async () => {
			try {
				const { user, accessToken, refreshToken } = await verifyUser(token)
				console.log(
					'accessToken, refreshToken and user from verifyUser: ',
					accessToken,
					refreshToken,
					user
				)
				// зберігаємо токени й юзера в контекст
				setTokens(accessToken, refreshToken)
				login(user)
				setStatus('success')

				// ⏳ Через 4 сек редірект на головну + очистка URL
				setTimeout(() => {
					navigate('/', { replace: true })
				}, 4000)
			} catch (err) {
				setStatus('error')
			}
		}

		verify()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (status === 'loading')
		return <div>{t('auth.register.verify.loading')}</div>
	if (status === 'success')
		return (
			<div>
				{t('auth.register.verify.success.text1')}
				<br />
				{t('auth.register.verify.success.text2')}
			</div>
		)
	if (status === 'error')
		return (
			<div>
				{t('auth.register.verify.error')} {errorMessage}
			</div>
		)
	return null
}

export default VerifyPage
