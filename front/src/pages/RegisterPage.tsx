import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterPage: React.FC = () => {
	const navigate = useNavigate()

	useEffect(() => {
		// Редірект на головну
		navigate('/', { replace: true, state: { showRegister: true } })
	}, [navigate])

	return null
}

export default RegisterPage
