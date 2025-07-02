import React from 'react'
import { styled } from '@mui/system'
import { useTranslation } from '../../translation/TranslationContext'

const Button = styled('button')({
	padding: 8,
	backgroundColor: '#db4437',
	color: '#fff',
	border: 'none',
	borderRadius: 4,
	cursor: 'pointer',
})

const GoogleAuthButton: React.FC = () => {
	const { t } = useTranslation()
	const handleGoogleLogin = () => {}

	return <Button onClick={handleGoogleLogin}>{t('auth.enterGoogle')}</Button>
}

export default GoogleAuthButton
