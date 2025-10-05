import React from 'react'
import { Box, styled } from '@mui/material'

const StyledFooter = styled('footer')(({ theme }) => ({
	width: '100%',
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
				<a
					href='https://www.instagram.com/actionlabcourse?igsh=MWF5c3ZhNXg3aHdqZQ%3D%3D&utm_source=qr'
					target='_blank'
					rel='noopener noreferrer'
				>
					<img
						src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759671845/Insta_ftaa6y.png'
						alt='Insta'
						width={50}
						height={50}
					/>
				</a>
				<a
					href='https://t.me/+ABCDEFGH1234'
					target='_blank'
					rel='noopener noreferrer'
				>
					<img
						src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759672666/Telega_ecv8kz.png'
						alt='Telegram'
						width={50}
						height={50}
					/>
				</a>
			</Box>
			<StyledText>© 2025 ActionLab. All rights reserved.</StyledText>
		</StyledFooter>
	)
}

export default Footer
