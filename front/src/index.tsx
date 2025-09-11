import React from 'react'
import ReactDOM from 'react-dom/client'

import './normalize.css'
import './index.css'

import App from './App'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		primary: { main: '#6C6D6F' }, // grey
		secondary: { main: '#F5DD47' }, // yellow
		background: { default: '#FFFFFF' }, // white
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
