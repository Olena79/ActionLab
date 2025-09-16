import React from 'react'
import { Box, styled, useMediaQuery } from '@mui/system'
import LanguageSwitcher from './../components/LanguageSwitcher'
import RegisterBtn from '../components/auth/RegisterBtn'

const StyledHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	width: '100%',
	padding: '4px 12px',
	backgroundColor: theme.palette.primary.main,
}))

const StyledBox = styled(Box)(() => ({
	display: 'flex',
	gap: 24,
}))

const Header: React.FC = () => {
	const isMobile = useMediaQuery('(max-width:600px)')

	return (
		<StyledHeader>
			<img
				src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758004915/FullLogoDarkPurple_doveuj.png'
				alt='Logo'
				height={100}
			/>
			<StyledBox>
				{!isMobile && <RegisterBtn />}

				<LanguageSwitcher />
			</StyledBox>
		</StyledHeader>
	)
}

export default Header
