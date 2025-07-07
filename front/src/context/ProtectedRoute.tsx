import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

interface Props {
	children: JSX.Element
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
	const { isAuthenticated, user, loading } = useAuth()

	if (loading) return null

	if (!isAuthenticated) {
		return <Navigate to='/' replace />
	}

	if (!user?.verified) {
		return <Navigate to='/' replace />
	}

	return children
}

export default ProtectedRoute
