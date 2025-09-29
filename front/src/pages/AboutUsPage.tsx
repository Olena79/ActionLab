import React from 'react'
import { styled } from '@mui/system'
import FloatingButton from '../components/FloatingButton'

const StyledPage = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	minHeight: '70vh',
	position: 'relative',
	width: '100%',
}))

const AboutUsPage: React.FC = () => {
	return (
		<StyledPage>
			<FloatingButton />
		</StyledPage>
	)
}

export default AboutUsPage
