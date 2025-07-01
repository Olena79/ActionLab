import React from 'react'
import { useTranslation } from './../translation/TranslationContext'
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { styled } from '@mui/system'

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
	paddingRight: 10,
}))

const StyledToggleButton = styled(ToggleButton)(() => ({
	fontSize: 8,
	padding: 4,
	color: 'black',
	backgroundColor: 'white',
	width: 'fit-content',
}))

const Text = styled('span')(() => ({
	color: '#583E26',
}))

const LanguageSwitcher: React.FC = () => {
	const { changeLanguage, lang } = useTranslation()

	const languages = [
		{ code: 'ua', label: 'UA' },
		{ code: 'en', label: 'EN' },
	] as const

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<StyledToggleButtonGroup
				value={lang}
				exclusive
				onChange={(_, newLang) => newLang && changeLanguage(newLang)}
				aria-label='language switcher'
			>
				{languages.map(({ code, label }) => (
					<StyledToggleButton key={code} value={code} aria-label={label}>
						<Text>{label}</Text>
					</StyledToggleButton>
				))}
			</StyledToggleButtonGroup>
		</Box>
	)
}

export default LanguageSwitcher

//========================================
