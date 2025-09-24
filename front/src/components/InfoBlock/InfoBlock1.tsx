import React from 'react'
import { Box, styled, useMediaQuery } from '@mui/material'

const InfoBlock1: React.FC = () => {
	const isMobile = useMediaQuery('(max-width:800px)')

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
			<StyledBlock12>
				<StyledBlock12Img1
					src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758100003/FB_IMG_1553150237971_vyribk.jpg'
					alt='Sample'
					width={isMobile ? 200 : 170}
				/>
				<StyledBlock12Img2
					src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758100004/DSC_0602sdet_zmxl4u.jpg'
					alt='Sample'
					width={isMobile ? 200 : 170}
				/>
				<StyledBlock12Img3
					src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758100003/FB_IMG_1553150289686_xrkpjb.jpg'
					alt='Sample'
					width={isMobile ? 200 : 170}
				/>
			</StyledBlock12>
		</Box>
	)
}

export default InfoBlock1
//=======================   =====================//

const StyledBlock12 = styled('div')(() => ({
	position: 'relative',
	minHeight: 113,
	maxWidth: 848,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: 8,

	'@media (max-width: 600px)': {
		minHeight: 300,
		maxWidth: 290,
	},
}))

const StyledBlock12Img1 = styled('img')(() => ({
	borderRadius: 6,
	'@media (max-width: 600px)': {
		position: 'absolute',
		top: 0,
		left: 0,
		objectFit: 'cover',
	},
}))

const StyledBlock12Img2 = styled('img')(() => ({
	borderRadius: 6,
	'@media (max-width: 600px)': {
		position: 'absolute',
		top: 100,
		right: 0,
		objectFit: 'cover',
	},
}))

const StyledBlock12Img3 = styled('img')(() => ({
	borderRadius: 6,
	'@media (max-width: 600px)': {
		position: 'absolute',
		bottom: 0,
		left: 0,
		objectFit: 'cover',
	},
}))
