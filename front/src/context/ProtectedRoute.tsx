import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

interface Props {
	children: JSX.Element
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
	const { isAuthenticated, user } = useAuth()

	if (!isAuthenticated) {
		return <Navigate to='/' replace />
	}

	if (!user?.verified) {
		return <Navigate to='/verify-required' replace />
	}

	return children
}

export default ProtectedRoute
