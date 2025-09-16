import React from 'react'
import ReactDOM from 'react-dom/client'

import './normalize.css'
import './index.css'

import App from './App'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		primary: { main: '#6C6D6F', light: '#6c6d6fb9', contrastText: '#e3e3e3ff' }, // grey
		secondary: { main: '#F5DD47', light: '#f8f0c1ff' }, // yellow
		background: { default: '#FFFFFF', paper: '#ffffffc1' }, // white
		error: { main: '#ff0000' },
		success: { main: '#00ff1e' },
	},
	typography: {
		fontFamily: 'OpenSans, sans-serif',
	},
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>
)
