import React from 'react'
import { Box, styled } from '@mui/system'
import FloatingButton from '../components/FloatingButton'
import { Typography } from '@mui/material'
// import { Typography } from '@mui/material'
// import ImageCarousel from '../components/ImageCarousel'

const AboutUsPage: React.FC = () => {
	return (
		<StyledPage>
			<FloatingButton />
			<Box sx={{ mt: 6 }}>
				<Typography sx={{ fontSize: 36, fontWeight: 600 }} variant='h1'>
					Сторінка в розробці....
				</Typography>
			</Box>
			{/* <StyledBox>
				<StyledInfoBox sx={{ alignItems: 'flex-end', boxShadow: 'none' }}>
					<h3>Тренер:</h3>
					<h1 style={{ fontSize: 24, fontWeight: 600 }}>Андрій Безверхній</h1>
				</StyledInfoBox>

				<StyledInfoBox>
					<Box sx={{ width: 310, height: 310 }}>
						<ImageCarousel />
					</Box>

					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
						<Typography sx={{ fontSize: 14 }}>
							Андрій Безверхній — тренер сценічного руху, каскадер із 7-річним
							досвідом у кіно та постановник трюків із 3-річним стажем. Почав із
							складних трюків, що допомогло відточити майстерність і зрозуміти
							важливість контролю кожного руху.
						</Typography>
						<Typography sx={{ fontSize: 14 }}>
							Паралельно розвивався в освіті: спершу учасник семінарів
							каскадерської майстерності, згодом — ведучий. Виробив власний
							підхід із акцентом на усвідомленому володінні тілом, техніці
							безпеки та сценічній виразності.
						</Typography>
						<Typography sx={{ fontSize: 14 }}>
							Андрій ділиться знаннями, навчає ефективно працювати з тілом,
							розкривати потенціал і знаходити гармонію між технікою та
							творчістю.
						</Typography>
					</Box>
				</StyledInfoBox>
			</StyledBox> */}
		</StyledPage>
	)
}

export default AboutUsPage
//==================================

const StyledPage = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	minHeight: '70vh',
	position: 'relative',
	width: '100%',
	color: theme.palette.primary.main,
}))

// const StyledBox = styled('div')(() => ({
// 	display: 'flex',
// 	flexDirection: 'column',
// 	width: '100%',
// 	padding: 20,
// 	gap: 16,
// }))

// const StyledInfoBox = styled(Box)(() => ({
// 	display: 'flex',
// 	gap: 16,
// 	boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
// 	margin: 5,
// 	padding: 5,
// 	borderRadius: 8,

// 	'@media (max-width: 600px)': {
// 		flexDirection: 'column',
// 		alignItems: 'center',
// 	},
// }))
