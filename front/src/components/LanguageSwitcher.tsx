import React from 'react'
import {
	LanguageCode,
	useTranslation,
} from './../translation/TranslationContext'
import { Box, MenuItem, Select, SelectChangeEvent, styled } from '@mui/material'

const LanguageSwitcher: React.FC = () => {
	const { t, changeLanguage, lang } = useTranslation()

	const handleChange = (event: SelectChangeEvent<LanguageCode>) => {
		const newLang = event.target.value as LanguageCode
		changeLanguage(newLang)
	}

	return (
		<StyledBox>
			<Select
				value={lang}
				onChange={handleChange}
				color='primary'
				variant='standard'
				sx={{ ml: 1 }}
			>
				<MenuItem value='ua'>{t('ua')}</MenuItem>
				<MenuItem value='en'>{t('en')}</MenuItem>
			</Select>
		</StyledBox>
	)
}

export default LanguageSwitcher

//========================================
const StyledBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	padding: '6px 12px',
	margin: '0 24px',
	backgroundColor: theme.palette.secondary.main,
	borderRadius: 24,
}))
