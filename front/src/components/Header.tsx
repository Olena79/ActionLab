import React from 'react'
import { styled } from '@mui/system'
import LanguageSwitcher from './../components/LanguageSwitcher'

const StyledHeader = styled('div')(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	backgroundColor: '#A78B71',
	borderRadius: 30,
	maxWidth: 300,
	width: '100%',
}))

const StyledTitle = styled('div')(() => ({
	fontSize: 14,
	color: '##583E26',
	padding: 10,
}))

const Header: React.FC = () => {
	return (
		<StyledHeader>
			<StyledTitle>Logo</StyledTitle>
			<LanguageSwitcher />
		</StyledHeader>
	)
}

export default Header
