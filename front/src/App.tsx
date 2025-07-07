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
import VerifyPage from './pages/VerifyPage'
import AutoLoginHandler from './components/auth/AutoLoginHandler'
import SuccessCoachApproved from './pages/SuccessCoachApproved'
import RejectCoach from './pages/RejectCoach'
import RegisterPage from './pages/RegisterPage'

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
					<AutoLoginHandler />
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

							<Route path='/verify' element={<VerifyPage />} />

							<Route
								path='/success-coach-approved'
								element={<SuccessCoachApproved />}
							/>

							<Route path='/reject-coach' element={<RejectCoach />} />

							<Route path='/register' element={<RegisterPage />} />
						</Routes>

						<Footer />
					</TranslationProvider>
				</Router>
			</StyledBox>
		</AuthProvider>
	)
}

export default App
