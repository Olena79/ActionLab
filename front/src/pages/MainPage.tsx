import React from 'react'
import { useTranslation } from '../translation/TranslationContext'
import { styled } from '@mui/system'
import { DialogTitle } from '@mui/material'

const StyledPage = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	minHeight: '70vh',
}))

const StyledTitle = styled(DialogTitle)(() => ({
	fontSize: '80px',
	fontWeight: 'bold',
}))

const MainPage: React.FC = () => {
	const { t } = useTranslation()

	return (
		<StyledPage>
			<StyledTitle>{t('hello')}</StyledTitle>
		</StyledPage>
	)
}

export default MainPage
