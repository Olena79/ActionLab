import React, { lazy } from 'react'
import { styled } from '@mui/system'
import FloatingButton from '../components/FloatingButton'
import InfoBlock from '../components/InfoBlock'

const AnimatedTexts = lazy(() => import('../components/AnimatedTexts'))
const AnimatedBlocks = lazy(() => import('../components/AnimatedBlocks'))

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

			<AnimatedBlocks />
			<InfoBlock />
		</StyledPage>
	)
}

export default MainPage
