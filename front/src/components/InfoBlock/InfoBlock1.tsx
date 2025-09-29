import React, { useState } from 'react'
import { Box, styled, useMediaQuery } from '@mui/material'

const InfoBlock1: React.FC = () => {
	const isMobile = useMediaQuery('(max-width:600px)')
	const [expandedImage, setExpandedImage] = useState<number | null>(null)

	const handleImageClick = (imageIndex: number) => {
		setExpandedImage(expandedImage === imageIndex ? null : imageIndex)
	}

	const images = [
		'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758100003/FB_IMG_1553150237971_vyribk.jpg',
		'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758100004/DSC_0602sdet_zmxl4u.jpg',
		'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758100003/FB_IMG_1553150289686_xrkpjb.jpg',
	]

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				'@media (max-width: 600px)': {
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				},
			}}
		>
			<StyledContainer isMobile={isMobile}>
				<StyledImageWrapper position='left'>
					<StyledImage
						src={images[0]}
						alt='Sample'
						width={isMobile ? 200 : 170}
						onClick={() => handleImageClick(0)}
						isMobile={isMobile}
					/>
				</StyledImageWrapper>

				<StyledImageWrapper position='right'>
					<StyledImage
						src={images[1]}
						alt='Sample'
						width={isMobile ? 200 : 170}
						onClick={() => handleImageClick(1)}
						isMobile={isMobile}
					/>
				</StyledImageWrapper>

				<StyledImageWrapper position='left'>
					<StyledImage
						src={images[2]}
						alt='Sample'
						width={isMobile ? 200 : 170}
						onClick={() => handleImageClick(2)}
						isMobile={isMobile}
					/>
				</StyledImageWrapper>

				{/* Развернутая копия изображения */}
				{expandedImage !== null && (
					<ExpandedImageCopy
						src={images[expandedImage]}
						alt='Expanded'
						onClick={() => setExpandedImage(null)}
						isMobile={isMobile}
					/>
				)}
			</StyledContainer>
		</Box>
	)
}

export default InfoBlock1

//=======================   =====================//

interface StyledContainerProps {
	isMobile: boolean
}

const StyledContainer = styled('div')<StyledContainerProps>(({ isMobile }) => ({
	position: 'relative',
	minHeight: 113,
	maxWidth: 848,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: 8,

	'@media (max-width: 600px)': {
		minHeight: 300,
		width: 330,
		flexDirection: 'column',
		gap: 0,
	},
}))

interface StyledImageWrapperProps {
	position: 'left' | 'right'
}

const StyledImageWrapper = styled('div')<StyledImageWrapperProps>(
	({ position }) => ({
		// Для десктопа - обычный flex элемент
		'@media (max-width: 600px)': {
			// Для мобильной - позиционирование слева-справа-слева
			alignSelf: position === 'left' ? 'flex-start' : 'flex-end',
			'&:not(:first-child)': {
				marginTop: position === 'right' ? '-50px' : '0',
			},
			'&:last-child': {
				marginTop: '-50px',
			},
		},
	})
)

interface StyledImageProps {
	isMobile: boolean
	onClick: () => void
}

const StyledImage = styled('img')<StyledImageProps>(() => ({
	borderRadius: 6,
	cursor: 'pointer',
	transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

	'&:hover': {
		transform: 'scale(1.05)',
	},
}))

interface ExpandedImageProps {
	isMobile: boolean
	onClick: () => void
}

const ExpandedImageCopy = styled('img')<ExpandedImageProps>(({ isMobile }) => ({
	position: 'absolute',
	top: 0,
	left: isMobile ? '-15%' : 0,
	width: isMobile ? '130%' : '100%',
	height: 'auto',
	objectFit: 'contain',
	zIndex: 1000,
	cursor: 'pointer',
	borderRadius: 6,
	backgroundColor: 'rgba(0, 0, 0, 0.05)',
	boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
	backdropFilter: 'blur(4px)',
	animation: 'expandIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',

	'@keyframes expandIn': {
		'0%': {
			opacity: 0,
			transform: 'scale(0.7) translateY(-20px)',
		},
		'60%': {
			opacity: 0.8,
			transform: 'scale(1.02) translateY(-5px)',
		},
		'100%': {
			opacity: 1,
			transform: 'scale(1) translateY(0)',
		},
	},

	'@media (max-width: 600px)': {
		left: '-15%',
		width: '130%',
	},
}))
