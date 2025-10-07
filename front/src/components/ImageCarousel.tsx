import React, { useState } from 'react'
import { Box, IconButton, styled, useMediaQuery, useTheme } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface ImagesProps {
	images: string[]
}

const ImageCarousel: React.FC<ImagesProps> = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const theme = useTheme()
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
	const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))

	const visibleCount = isDesktop ? 3 : isTablet ? 2 : 1

	const prevImage = () => {
		setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
	}

	const nextImage = () => {
		setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
	}

	return (
		<CarouselContainer visibleCount={visibleCount}>
			{images.map((src, index) => {
				let offset = index - currentIndex
				// для циклічності
				if (offset < -1) offset += images.length
				if (offset > images.length - 1) offset -= images.length
				return (
					<SlideImg
						key={index}
						src={src}
						offset={offset}
						visibleCount={visibleCount}
					/>
				)
			})}
			<ControlButton sx={{ left: 8 }} onClick={prevImage}>
				<ArrowBackIosNewIcon />
			</ControlButton>
			<ControlButton sx={{ right: 8 }} onClick={nextImage}>
				<ArrowForwardIosIcon />
			</ControlButton>
		</CarouselContainer>
	)
}

export default ImageCarousel

//===========================================

const CarouselContainer = styled(Box)<{ visibleCount: number }>(
	({ visibleCount }) => ({
		width: 300 * visibleCount,
		height: 300,
		position: 'relative',
		overflow: 'hidden',
		borderRadius: 8,
		display: 'flex',
		gap: 16,
	})
)

const SlideImg = styled('img')<{ offset: number; visibleCount: number }>(
	({ offset, visibleCount }) => ({
		width: 300,
		height: 300,
		objectFit: 'cover',
		position: 'absolute',
		top: 0,
		left: 0,
		transform: `translateX(calc(${offset * 100}% + ${offset * 16}px))`,
		transition: 'transform 0.5s ease-in-out',
	})
)

const ControlButton = styled(IconButton)({
	position: 'absolute',
	top: '50%',
	transform: 'translateY(-50%)',
	color: '#fff',
	backgroundColor: 'rgba(0,0,0,0.3)',
	'&:hover': {
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	zIndex: 10,
})
