import React from 'react'
import { Box, styled, useMediaQuery } from '@mui/material'
import { useTranslation } from '../../translation/TranslationContext'

const InfoBlock1: React.FC = () => {
	const { t } = useTranslation()
	const isMobile = useMediaQuery('(max-width:800px)')

	const texts = [
		['infoBlock.block1.text1.text1', 'infoBlock.block1.text1.text2'],
		['infoBlock.block1.text2.text1', 'infoBlock.block1.text2.text2'],
		[
			'infoBlock.block1.text3.text1',
			'infoBlock.block1.text3.text2',
			'infoBlock.block1.text3.text3',
		],
		[
			'infoBlock.block1.text4.text1',
			'infoBlock.block1.text4.text2',
			'infoBlock.block1.text4.text3',
		],
		[
			'infoBlock.block1.text5.text1',
			'infoBlock.block1.text5.text2',
			'infoBlock.block1.text5.text3',
		],
		[
			'infoBlock.block1.text6.text1',
			'infoBlock.block1.text6.text2',
			'infoBlock.block1.text6.text3',
		],
	]

	return (
		<StyledBlock1>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 3,
				}}
			>
				{texts.map((group, idx) => (
					<StyledBlock11 key={idx}>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758098388/Ellipse_1_e87rcf.svg'
							alt='Circle'
							width={25}
							height={25}
						/>
						<StyledBlock11Texts>
							{group.map((text, i) => (
								<span style={{ marginRight: 4 }} key={i}>
									{t(text)}
								</span>
							))}
						</StyledBlock11Texts>
					</StyledBlock11>
				))}
			</Box>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',

					'@media (max-width: 800px)': {
						flexDirection: 'column-reverse',
						marginLeft: '25%',
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
		</StyledBlock1>
	)
}

export default InfoBlock1
//=======================   =====================//

const StyledBlock1 = styled('div')(({ theme }) => ({
	padding: 20,
	display: 'grid',
	gridTemplateColumns: '1fr 360px',
	gap: 12,
	color: theme.palette.primary.main,
	fontWeight: 700,
	fontSize: 16,
	'@media (max-width: 900px)': {
		gridTemplateColumns: '1fr 100px',
	},
	'@media (max-width: 800px)': {
		display: 'flex',
		flexDirection: 'column',
		gap: 50,
	},
}))

const StyledBlock11 = styled('div')(({ theme }) => ({
	display: 'flex',
	gap: 16,
	alignItems: 'center',
}))

const StyledBlock11Texts = styled('div')(() => ({
	display: 'flex',
	alignItems: 'center',
	'@media (max-width: 600px)': {
		flexDirection: 'column',
		alignItems: 'flex-start',
		'& span:nth-of-type(2)': {
			marginLeft: 40,
		},
		'& span:nth-of-type(3)': {
			marginLeft: 80,
		},
	},
}))

const StyledBlock12 = styled('div')(() => ({
	position: 'relative',

	'@media (max-width: 800px)': {
		minHeight: 300,
		maxWidth: 290,
	},
}))

const StyledBlock12Img1 = styled('img')(() => ({
	position: 'absolute',
	top: 0,
	left: 0,
	borderRadius: 6,
	objectFit: 'cover',
}))

const StyledBlock12Img2 = styled('img')(() => ({
	position: 'absolute',
	top: 100, // можна трохи змістити для красивого накладання
	right: 0,
	borderRadius: 6,
	objectFit: 'cover',
}))

const StyledBlock12Img3 = styled('img')(() => ({
	position: 'absolute',
	bottom: 0,
	left: 0,
	borderRadius: 6,
	objectFit: 'cover',
}))
