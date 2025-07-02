import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { verifyUser } from '../actions/authActions'

const VerifyPage: React.FC = () => {
	const { token } = useParams<{ token: string }>()
	const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
		'loading'
	)

	useEffect(() => {
		if (!token) {
			setStatus('error')
			return
		}

		verifyUser(token)
			.then(() => setStatus('success'))
			.catch(() => setStatus('error'))
	}, [token])

	if (status === 'loading') return <div>Перевіряємо...</div>
	if (status === 'success') return <div>✅ Ваш email підтверджено!</div>
	if (status === 'error')
		return <div>❌ Помилка верифікації або токен недійсний.</div>
	return null
}

export default VerifyPage
