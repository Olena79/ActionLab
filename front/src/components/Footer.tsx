import React from 'react'
import { styled } from '@mui/material'

const StyledFooter = styled('footer')(() => ({
	width: '100%',
	marginTop: 30,
	padding: 30,
	borderTop: '5px solid black',
}))

const StyledText = styled('p')(() => ({
	fontSize: 30,
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
