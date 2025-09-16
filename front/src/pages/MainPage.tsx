import React from 'react'
import { styled } from '@mui/system'
import FloatingButton from '../components/FloatingButton'
import AnimatedTexts from '../components/AnimatedTexts'

const StyledPage = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	minHeight: '70vh',
	position: 'relative',
	width: '100%',
}))

const MainPage: React.FC = () => {
	return (
		<StyledPage>
			<FloatingButton />

			<AnimatedTexts />
		</StyledPage>
	)
}

export default MainPage
