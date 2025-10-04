import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TranslationProvider } from './translation/TranslationContext'
import MainPage from './pages/MainPage'
import Header from './components/Header'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import { styled } from '@mui/material'
import ProgramsPage from './pages/ProgramsPage'
import AboutUsPage from './pages/AboutUsPage'
import PaymentResultPage from './pages/PaymentResultPage'

const MainBox = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
}))

const StyledBox = styled('div')(({ theme }) => ({
	margin: '0 auto',
	maxWidth: '1100px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	minHeight: '100vh',
	backgroundColor: theme.palette.background.default,
	overflowX: 'hidden',
}))

const App: React.FC = () => {
	return (
		<AuthProvider>
			<MainBox>
				<StyledBox>
					<Router>
						<TranslationProvider>
							<Header />

							<Routes>
								<Route path='/' element={<MainPage />} />
								<Route path='/program' element={<ProgramsPage />} />
								<Route path='/about-us' element={<AboutUsPage />} />
								<Route
									path='/payment-success'
									element={<PaymentResultPage />}
								/>
							</Routes>

							<Footer />
						</TranslationProvider>
					</Router>
				</StyledBox>
			</MainBox>
		</AuthProvider>
	)
}

export default App
