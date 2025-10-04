import React, { useState } from 'react'
import { Box, IconButton, styled } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const images = [
	'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759161846/jlok9736ef_fwk3it.png',
	'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759168402/gdhbd45_o1xpbf.png',
	'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759168403/sdv789746_slnkbz.png',
	'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759168403/%D0%91%D0%B5%D0%B7_%D0%B8%D0%BC%D0%B5%D0%BD%D0%B8-2_wdgoox.png',
	'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759168402/fdg98_gfrl3y.png',
	'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759168402/12esede67t_dt1khb.png',
	'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759168402/sdef67etdh_o3gyp8.png',
	'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759168403/wefw4t365u_vqkthx.png',
	'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759168402/oiu345_jwkvbo.png',
	'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759168402/oiuytkdee23_kgu3p7.png',
]

const ImageCarousel: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState(0)

	const prevImage = () => {
		setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
	}

	const nextImage = () => {
		setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
	}

	return (
		<CarouselContainer>
			{images.map((src, index) => {
				let offset = index - currentIndex
				// для циклічності
				if (offset < -1) offset += images.length
				if (offset > images.length - 1) offset -= images.length
				return <SlideImg key={index} src={src} offset={offset} />
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
const CarouselContainer = styled(Box)({
	width: 300,
	height: 300,
	position: 'relative',
	overflow: 'hidden',
	borderRadius: 8,
})

const SlideImg = styled('img')<{ offset: number }>(({ offset }) => ({
	width: 300,
	height: 300,
	objectFit: 'cover',
	position: 'absolute',
	top: 0,
	left: 0,
	transform: `translateX(${offset * 100}%)`,
	transition: 'transform 0.5s ease-in-out',
}))

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
