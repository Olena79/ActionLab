import React from 'react'
import { styled } from '@mui/material'

const StyledFooter = styled('footer')(() => ({
	width: '100%',
	margin: '30px auto 0 auto',
	padding: 30,
	borderTop: '5px solid black',
}))

const StyledText = styled('p')(() => ({
	fontSize: 200,
	textAlign: 'center',
}))

const Footer: React.FC = () => {
	return (
		<StyledFooter>
			<StyledText>Footer</StyledText>
		</StyledFooter>
	)
}

export default Footer
