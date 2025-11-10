import React from 'react'
import { VideoPlayer } from '../VideoPlayer'
import { Box, styled, Typography } from '@mui/material'

const Block1: React.FC = () => {
	return (
		<>
			<Typography
				variant='h6'
				sx={{ textAlign: 'center', color: '#6C6D6F', fontWeight: 600 }}
			>
				Сценічний бій — тренуй тіло, керуй емоціями, створюй динамічні
				хореографії
			</Typography>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					width: '100%',
					mb: 2,
					gap: 2,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						alignItems: 'center',
						'@media (max-width: 600px)': { flexDirection: 'column' },
					}}
				>
					<p
						style={{
							color: '#6C6D6F',
							fontWeight: 600,
							textAlign: 'start',
						}}
					>
						Безпечна техніка, акробатика, робота із холодною зброєю і
						відпрацювання емоцій — усе в ігровому форматі.
					</p>
					<StyledVideoItemBox>
						<VideoPlayer
							src='/media/Training1.mp4'
							poster='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758705564/phmgfhdghkilio_v01rvj.png'
						/>
					</StyledVideoItemBox>
				</Box>
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						alignItems: 'center',

						'@media (max-width: 600px)': { flexDirection: 'column-reverse' },
					}}
				>
					<StyledVideoItemBox>
						<VideoPlayer
							src='/media/Training3.mp4'
							poster='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758100004/DSC_0602sdet_zmxl4u.jpg'
						/>
					</StyledVideoItemBox>
					<p style={{ color: '#6C6D6F', fontWeight: 600, textAlign: 'end' }}>
						Інтенсивні групові заняття від професійних каскадерів (XGST,
						Stuntalot). 2 години щотижня — від бази до сценічних номерів.
					</p>
				</Box>
			</Box>
		</>
	)
}

export default Block1
//==========================
const StyledVideoItemBox = styled(Box)(({ theme }) => ({
	padding: 6,
	border: `3px solid ${theme.palette.primary.main}`,
	backgroundColor: theme.palette.secondary.main,
	borderRadius: 12,
	width: 580,
	display: 'flex',
	justifyContent: 'center',

	'@media (max-width: 600px)': {
		width: '100%',
	},
}))
