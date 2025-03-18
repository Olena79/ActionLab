import React from 'react'
import { TranslationProvider } from './translation/TranslationContext'
import ConstructorPage from './pages/ConstructorPage'
import Header from './components/Header'
import { CakeSelectionProvider } from './context/CakeContext'
import { styled } from '@mui/material'

const StyledBox = styled('div')(() => ({
	margin: '0 auto',
	maxWidth: '1100px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	minHeight: '300vh',
}))

const App: React.FC = () => {
	return (
		<CakeSelectionProvider>
			<StyledBox>
				<TranslationProvider>
					<Header />
					<ConstructorPage />
				</TranslationProvider>
			</StyledBox>
		</CakeSelectionProvider>
	)
}

export default App
