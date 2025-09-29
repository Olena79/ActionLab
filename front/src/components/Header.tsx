import React from 'react'
import { Box, styled, useMediaQuery } from '@mui/system'
// import LanguageSwitcher from './../components/LanguageSwitcher'
import ToSeminarsBtn from './auth/ToSeminarsBtn'
import ButtonContained from './ButtonContained'

const StyledHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	width: '100%',
	padding: '4px 12px',
	backgroundColor: theme.palette.primary.main,
}))

const Header: React.FC = () => {
	const isMobile = useMediaQuery('(max-width:600px)')

	return (
		<StyledHeader>
			<a href='/'>
				<img
					src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758004915/FullLogoDarkPurple_doveuj.png'
					alt='Logo'
					height={isMobile ? 50 : 90}
				/>
			</a>

			<Box sx={{ display: 'flex', gap: isMobile ? 1 : 2 }}>
				<ButtonContained
					sx={{ fontSize: isMobile ? 12 : 16 }}
					pass='/about-us'
					text='Про нас'
				/>
				<ToSeminarsBtn isMobile={isMobile} />
			</Box>

			{/* <LanguageSwitcher /> */}
		</StyledHeader>
	)
}

export default Header
