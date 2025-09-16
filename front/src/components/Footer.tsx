import React from 'react'
import { Box, styled } from '@mui/material'

const StyledFooter = styled('footer')(({ theme }) => ({
	width: '100%',
	marginTop: 30,
	padding: 30,
	backgroundColor: theme.palette.primary.main,
}))

const StyledText = styled('p')(({ theme }) => ({
	fontSize: 10,
	textAlign: 'center',
	color: theme.palette.secondary.main,
}))

const Footer: React.FC = () => {
	return (
		<StyledFooter>
			<Box sx={{ display: 'flex', gap: 6, justifyContent: 'center', mb: 2 }}>
				<img
					src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1757487239/icons8-instagram-48_s0bkii.png'
					alt='Insta'
				/>
				<img
					src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1757487239/icons8-facebook-%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9-48_ndclai.png'
					alt='Facebook'
				/>
			</Box>
			<StyledText>© 2025 ActionLab. All rights reserved.</StyledText>
		</StyledFooter>
	)
}

export default Footer
