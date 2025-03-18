import { styled } from '@mui/material'
import React from 'react'

const Line3 = styled('div')(() => ({
	height: 2,
	width: '100%',
	backgroundColor: '#F1BAA1',
}))

const Line4 = styled('div')(() => ({
	height: 2,
	width: '100%',
	backgroundColor: '#BCAF4D',
}))

const AllLines = styled('div')(() => ({
	margin: '20px 0',
	width: '100%',
}))

const Line: React.FC = () => {
	return (
		<AllLines>
			<Line3 />
			<Line4 />
		</AllLines>
	)
}

export default Line
