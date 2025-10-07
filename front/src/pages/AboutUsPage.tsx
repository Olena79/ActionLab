import React from 'react'
import { styled } from '@mui/system'
import FloatingButton from '../components/FloatingButton'
import AndrewForm from '../components/PersonsForms/AndrewForm'
import LenaForm from '../components/PersonsForms/LenaForm'

const AboutUsPage: React.FC = () => {
	return (
		<StyledPage>
			<FloatingButton />
			<AndrewForm />
			<LenaForm />
		</StyledPage>
	)
}

export default AboutUsPage
//==================================

const StyledPage = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: 16,
	alignItems: 'center',
	minHeight: '70vh',
	position: 'relative',
	width: '100%',
	color: theme.palette.primary.main,
	padding: 12,
}))
