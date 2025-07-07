import React, { useEffect, useState } from 'react'
import { useTranslation } from '../translation/TranslationContext'
import { styled } from '@mui/system'
import { DialogTitle } from '@mui/material'
import AuthModal from '../components/auth/AuthModal'
import { useLocation, useNavigate } from 'react-router-dom'

const StyledPage = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	minHeight: '70vh',
}))

const StyledTitle = styled(DialogTitle)(() => ({
	fontSize: '100px',
	fontWeight: 'bold',
}))

const MainPage: React.FC = () => {
	const { t } = useTranslation()
	const location = useLocation()
	const navigate = useNavigate()
	const [showAuthModal, setShowAuthModal] = useState(false)

	useEffect(() => {
		if (location.state?.showRegister) {
			setShowAuthModal(true)
			// приберемо state з history, щоб модалка не з’являлася при оновленні сторінки
			navigate(location.pathname, { replace: true })
		}
	}, [location, navigate])

	return (
		<StyledPage>
			<StyledTitle>{t('hello')}</StyledTitle>

			{showAuthModal && (
				<AuthModal
					initialTab='register'
					onClose={() => setShowAuthModal(false)}
					setInfoMessage={() => {}}
				/>
			)}
		</StyledPage>
	)
}

export default MainPage
