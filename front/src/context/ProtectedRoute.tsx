import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import InfoModal from '../components/InfoModal'
import { useTranslation } from '../translation/TranslationContext'

interface Props {
	children: JSX.Element
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
	const { t } = useTranslation()
	const { isAuthenticated, user, loading } = useAuth()
	const [showModal, setShowModal] = useState(false)
	const [redirect, setRedirect] = useState(false)

	useEffect(() => {
		if (!loading && (!isAuthenticated || !user?.verified)) {
			setShowModal(true)
		}
	}, [loading, isAuthenticated, user])

	const handleClose = () => {
		setShowModal(false)
		setRedirect(true)
	}

	if (loading) return null

	if (redirect) {
		return <Navigate to='/' replace />
	}

	if (showModal) {
		return (
			<InfoModal
				title={t('protectedRoutInfo.title')}
				message1={t('protectedRoutInfo.message1')}
				message2={t('protectedRoutInfo.message2')}
				onClose={handleClose}
				labelOk={t('protectedRoutInfo.labelOk')}
			/>
		)
	}

	return children
}

export default ProtectedRoute
