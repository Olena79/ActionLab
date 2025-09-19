import React, { lazy, Suspense } from 'react'
import { styled } from '@mui/system'
import FloatingButton from '../components/FloatingButton'
// import FloatingButton from '../components/FloatingButton'
// import FloatingButtonProg from '../components/FloatingButtonProg'

const AnimatedTexts = lazy(() => import('../components/AnimatedTexts'))
const AnimatedBlocks = lazy(() => import('../components/AnimatedBlocks'))
const InfoBlock = lazy(() => import('../components/InfoBlock'))

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

			<Suspense
				fallback={<div style={{ width: '100%' }}>Завантаження подій...</div>}
			>
				<InfoBlock />
			</Suspense>
		</StyledPage>
	)
}

export default MainPage
