import React from 'react'
import { styled } from '@mui/system'
import LanguageSwitcher from './../components/LanguageSwitcher'
// import { useTranslation } from '../translation/TranslationContext'

const StyledHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	width: '100%',
	backgroundColor: theme.palette.primary.main,
}))

const StyledTitle = styled('a')(() => ({
	textDecoration: 'none',
	color: 'black',
	transition: '0.5s',
	cursor: 'pointer',
	padding: 6,
	'&:hover': {
		color: 'red',
	},
}))

const Header: React.FC = () => {
	// const { t } = useTranslation()
	return (
		<StyledHeader>
			<StyledTitle href='/'>
				<img
					src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1757584883/FullLogo_wr6wvq.png'
					alt='Logo'
					height={100}
				/>
			</StyledTitle>

			<LanguageSwitcher />
		</StyledHeader>
	)
}

export default Header
