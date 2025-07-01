import React from 'react'
import { styled } from '@mui/system'
import LanguageSwitcher from './../components/LanguageSwitcher'
import Auth from './auth/Auth'
import { useTranslation } from '../translation/TranslationContext'

const StyledHeader = styled('div')(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	width: '100%',
	borderBottom: '1px solid black',
}))

const StyledTitle = styled('a')(() => ({
	textDecoration: 'none',
	color: 'black',
	fontSize: 30,
	transition: '0.5s',
	cursor: 'pointer',
	padding: 22,
	'&:hover': {
		color: 'red',
	},
}))

const StyledMenu = styled('div')(() => ({
	display: 'flex',
	alignItems: 'center',
	gap: 16,
}))

const StyledLink = styled('a')(() => ({
	textDecoration: 'none',
	color: 'black',
	fontSize: 20,
	transition: '0.5s',
	cursor: 'pointer',
	'&:hover': {
		color: 'red',
	},
}))

const Header: React.FC = () => {
	const { t } = useTranslation()
	return (
		<StyledHeader>
			<StyledTitle href='/'>Logo</StyledTitle>
			<StyledMenu>
				<StyledLink href='/calendar'>{t('header.calendar')}</StyledLink>
				<Auth />
				<LanguageSwitcher />
			</StyledMenu>
		</StyledHeader>
	)
}

export default Header
