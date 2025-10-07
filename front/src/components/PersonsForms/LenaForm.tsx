import React, { useState } from 'react'
import { Box, styled } from '@mui/system'
import { Typography } from '@mui/material'
import ImageCarousel from '../ImageCarousel'
import YouTubePlayer from '../YouTubePlayer'
import { Collapse } from '@mui/material'

const images = [
	'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759829420/116_hasuyx.png',
	'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759829455/121_imn7au.png',
	'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759829454/117_prqxcw.png',
	'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759829510/120_id3cxu.png',
	'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759829536/114_jikn7l.png',
	'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759829555/119_nushsl.png',
	'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759829560/118_kk4bj2.png',
	'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759829589/111_kqqllu.png',
	'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759829595/113_xttyb5.png',
]

const LenaForm: React.FC = () => {
	const [openInfo, setOpenInfo] = useState(false)
	return (
		<StyledBox>
			<StyledInfoBox
				sx={{ alignItems: 'flex-start', boxShadow: 'none', marginLeft: 4 }}
			>
				<h3>Помічник тренера:</h3>
				<h1 style={{ fontSize: 24, fontWeight: 600 }}>Олена Клементьєва</h1>
			</StyledInfoBox>

			<StyledInfoBox>
				<Box sx={{ height: 310 }}>
					<ImageCarousel images={images} />
				</Box>

				<StyledButton onClick={() => setOpenInfo(prev => !prev)}>
					<span style={{ fontWeight: 600, fontSize: 18 }}>Детальніше</span>
					<img
						src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759825349/ArrowDown2_unkite.png'
						alt='ArrowDown'
						height={16}
					/>
				</StyledButton>

				<Collapse in={openInfo} timeout={400}>
					<>
						<Box
							sx={{
								fontSize: 14,
								display: 'flex',
								flexDirection: 'column',
								gap: 1,
							}}
						>
							<Typography sx={{ fontSize: 14 }}>
								Олена Клементьєва — каскадер із 15-річним досвідом у кіно.
							</Typography>

							<Typography sx={{ fontSize: 12, fontWeight: 600 }}>
								Спеціалізується:
							</Typography>
							<ul style={{ fontSize: 13, marginLeft: 12 }}>
								<SmallLi text='сценічні бої з/без хол./вогнеп. зброї;' />
								<SmallLi text='падіння (в тому числі висотні);' />
								<SmallLi
									text='складні трюки (такі як сбивання машиною, вистрибування з
									машини, тощо);'
								/>
								<SmallLi text='горіння;' />
								<SmallLi text='виконання трюків з ріггінгом(на підвісах);' />
								<SmallLi text='мокап;' />
							</ul>

							<Typography sx={{ fontSize: 14 }}>
								Почала свою діяльність із командою{' '}
								<a href='https://stunt-ua.com/uk'>XGST</a>, зродом приєдналася
								до команди{' '}
								<a href='https://www.instagram.com/stuntalot_action_crew?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='>
									"Stuntalot"
								</a>
								. Співпрацювала з вітчизняними виробниками кіно, та з
								закордонними (в тому числі Netflix). Деякий час працювала в
								Болівуді.
							</Typography>
							<Box sx={{ paddingLeft: 'calc(50% - 160px)' }}>
								<Box
									sx={{
										backgroundImage:
											'url("https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759833710/box_quotes_shqoxi.png")',
										backgroundSize: 'contain',
										backgroundPosition: 'center',
										backgroundRepeat: 'no-repeat',
										width: 320,
										height: 130,
										padding: '32px 8px 0 8px',
										textAlign: 'center',
									}}
								>
									<Typography
										sx={{
											fontSize: 13,
											fontStyle: 'italic',
											fontWeight: 600,
										}}
									>
										Для акторів сценічний рух — необхідність. Для всіх інших —
										шлях до впевненості та свободи у власному тілі.
									</Typography>
								</Box>
							</Box>
						</Box>

						<Typography variant='h5' sx={{ textAlign: 'center', mt: 2 }}>
							Фільмографія
						</Typography>
						<Typography sx={{ textAlign: 'start', mt: 2, fontWeight: 600 }}>
							Фільми та серіали
						</Typography>
						<StyledUl>
							<EasyLi text1='«RRR»' text2='реж. S. S. Rajamouli' />
							<EasyLi text1='«Урожай диявола»' text2='реж. Д. Менделюк' />
							<EasyLi text1='«Білий ворон»' text2='реж. М. Бушан' />
							<EasyLi
								text1='«Козаки. Дуже брехлива історія»'
								text2='реж. О. Березань'
							/>
							<EasyLi text1='«Егрегор»' text2='реж. С. Капралов' />
							<EasyLi text1='«Носоріг»' text2='реж. О. Сенцов' />
							<EasyLi text1='«Ghost»' text2='реж. Praveen Sattaru' />
							<EasyLi text1='«Merry Christmas»' text2='реж. Sriram Raghavan' />
							<EasyLi text1='«Брат за брата»' text2='реж. О. Туранський' />

							<EasyLi text1='«Мажор»' text2='реж. К. Стацький' />
							<EasyLi text1='«Ангели»' text2='реж. 	О. Масленніков' />
						</StyledUl>

						<Typography sx={{ textAlign: 'start', mt: 2, fontWeight: 600 }}>
							Кліпи
						</Typography>

						<StyledUl>
							<EasyLi2
								text1='«Мадемуазель Живаго»'
								text2='реж. А. Бадоев'
								text3='спів. Лара Фабіан'
							/>

							<EasyLi2
								text1='«Міг»'
								text2='реж. Л. Колосовський'
								text3='спів. «Ленінград»'
							/>
							<EasyLi2
								text1='«Твоя А»'
								text2='реж. А. Бадоев'
								text3='спів. Аніта Цой'
							/>
							<EasyLi2
								text1='«Bassa Sababa»'
								text2='реж. Roy Raz'
								text3='спів. Нетта'
							/>
							<EasyLi2 text1='«Мішки»' text2='' text3='спів. Маняша' />
						</StyledUl>

						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<Box
								sx={{
									padding: 1,
									width: '100%',
									border: '3px solid #6C6D6F',
									backgroundColor: '#F5DD47',
									borderRadius: 4,
									maxWidth: 600,
								}}
							>
								<YouTubePlayer videoUrl='https://youtu.be/yPGLCX6dd5M' />
							</Box>
						</Box>

						<StyledButton
							sx={{ padding: 2 }}
							onClick={() => setOpenInfo(prev => !prev)}
						>
							<img
								src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759825355/ArrowUp1_nk4jwo.png'
								alt='ArrowDown'
								height={16}
							/>
						</StyledButton>
					</>
				</Collapse>
			</StyledInfoBox>
		</StyledBox>
	)
}

export default LenaForm
//==================================

const StyledBox = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	padding: 20,
	gap: 16,
	boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
	borderRadius: 8,
}))

const StyledInfoBox = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: 16,
	margin: 5,
	padding: 5,
}))

const StyledUl = styled('ul')(() => ({
	display: 'grid',
	gridTemplateColumns: '1fr 1fr 1fr',
	gap: 6,
	marginBottom: 12,
	margin: 5,
	padding: 5,

	'@media (max-width: 950px)': {
		gridTemplateColumns: '1fr 1fr',
	},

	'@media (max-width: 600px)': {
		gridTemplateColumns: '1fr',
	},
}))

const StyledButton = styled('button')(() => ({
	width: '100%',
	padding: 6,
	textAlign: 'center',
	borderBottom: '1px solid #6c6d6fb9',
	display: 'flex',
	gap: 20,
	justifyContent: 'center',
	alignItems: 'center',
}))

//==============================================

interface EasyLiProps {
	text1: string
	text2: string
}

const EasyLi: React.FC<EasyLiProps> = ({ text1, text2 }) => {
	return (
		<li
			style={{
				borderBottom: '1px solid #d9d6ce',
				paddingBottom: 4,
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<span style={{ fontWeight: 600, color: 'black' }}>{text1}</span>
			<span style={{ fontSize: 12 }}>{text2}</span>
		</li>
	)
}

interface EasyLi2Props {
	text1: string
	text2: string
	text3: string
}

const EasyLi2: React.FC<EasyLi2Props> = ({ text1, text2, text3 }) => {
	return (
		<li
			style={{
				borderBottom: '1px solid #d9d6ce',
				paddingBottom: 4,
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<span style={{ fontWeight: 600, color: 'black' }}>{text1}</span>
			<span style={{ fontSize: 12 }}>{text2}</span>
			<span style={{ fontSize: 12 }}>{text3}</span>
		</li>
	)
}

interface SmallLiProps {
	text: string
}

const SmallLi: React.FC<SmallLiProps> = ({ text }) => {
	return (
		<li>
			<img
				src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759157557/dfbgm4353_djeebm.png'
				alt='Btn'
				width={12}
				height={12}
				style={{ marginRight: 4 }}
			/>
			{text}
		</li>
	)
}
