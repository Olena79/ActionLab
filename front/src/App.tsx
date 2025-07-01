import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TranslationProvider } from './translation/TranslationContext'
import MainPage from './pages/MainPage'
import Header from './components/Header'
import CalendarPage from './pages/CalendarPage'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './context/ProtectedRoute'
import { styled } from '@mui/material'
import VerifyRequiredPage from './components/auth/VerifyRequiredPage '

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
		<AuthProvider>
			<StyledBox>
				<Router>
					<TranslationProvider>
						<Header />

						<Routes>
							<Route path='/' element={<MainPage />} />
							<Route
								path='/calendar'
								element={
									<ProtectedRoute>
										<CalendarPage />
									</ProtectedRoute>
								}
							/>
							<Route path='/verify-required' element={<VerifyRequiredPage />} />
						</Routes>

						<Footer />
					</TranslationProvider>
				</Router>
			</StyledBox>
		</AuthProvider>
	)
}

export default App
