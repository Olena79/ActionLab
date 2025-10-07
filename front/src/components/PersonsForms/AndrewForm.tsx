import React, { useState } from 'react'
import { Box, styled } from '@mui/system'
import { Typography } from '@mui/material'
import ImageCarousel from '../ImageCarousel'
import YouTubePlayer from '../YouTubePlayer'
import { Collapse } from '@mui/material'

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

const AndrewForm: React.FC = () => {
	const [openInfo, setOpenInfo] = useState(false)
	return (
		<StyledBox>
			<StyledInfoBox
				sx={{ alignItems: 'flex-start', boxShadow: 'none', marginLeft: 4 }}
			>
				<h3>Тренер:</h3>
				<h1 style={{ fontSize: 24, fontWeight: 600 }}>Андрій Безверхній</h1>
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
								Андрій Безверхній — тренер сценічного руху, каскадер із 7-річним
								досвідом у кіно та постановник трюків із 3-річним стажем.
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
								Паралельно розвивався в освіті: спершу як помічник тренера
								семінарів сценічного руху, згодом — як тренер. Навчався у{' '}
								<a href='https://www.instagram.com/dmitryrudiy?igsh=MXF5cjJ4OXVyZzg5cg=='>
									Діми Рудого
								</a>
								,{' '}
								<a href='https://www.facebook.com/sergey.zayats.584142'>
									Сергія Зайця
								</a>
								, працював в команді{' '}
								<a href='https://www.instagram.com/stuntalot_action_crew?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='>
									"Stuntalot"
								</a>
								. Виробив власний підхід із акцентом на усвідомленому володінні
								тілом, техніці безпеки та сценічній виразності.
							</Typography>
							<Typography sx={{ fontSize: 14 }}>
								Андрій ділиться знаннями, навчає ефективно працювати з тілом,
								розкривати потенціал і знаходити гармонію між технікою та
								творчістю.
							</Typography>
						</Box>

						<Typography variant='h5' sx={{ textAlign: 'center', mt: 2 }}>
							Фільмографія
						</Typography>
						<StyledFilmBox>
							<Box>
								<Typography
									variant='h6'
									sx={{
										mb: 1,
										borderBottom: '1px solid grey',
										width: 'fit-content',
									}}
								>
									Каскадер
								</Typography>
								<StyledUl>
									<EasyLi
										text1='«The Rising Hawk»'
										text2='реж. Джон Вінн / А. Сейтаблаєв'
									/>
									<EasyLi text1='«Опер за викликом»' text2='реж. Т. Ткаченко' />
									<EasyLi
										text1='«Дивлячись вдалину»'
										text2='реж. В. Мельниченко'
									/>
									<EasyLi text1='«Чорний ворон»' text2='реж. О. Березань' />
									<EasyLi text1='«Юрчишини»' text2='реж. О. Березань' />
									<EasyLi
										text1='«Козаки. Дуже брехлива історія»'
										text2='реж. О. Березань'
									/>
									<EasyLi text1='«Джура Королевич»' text2='реж. А. Гойда' />
									<EasyLi
										text1='«Карпатський Рейнджер»'
										text2='реж. С. Крутін'
									/>
								</StyledUl>
							</Box>
							<Box>
								<Typography
									variant='h6'
									sx={{
										mb: 1,
										borderBottom: '1px solid grey',
										width: 'fit-content',
									}}
								>
									Постановник трюків
								</Typography>
								<StyledUl>
									<EasyLi text1='«Плут 2»' text2='реж. A. Ітігілов' />
									<EasyLi text1='«Тамада»' text2='реж. А. Сальніков' />
									<EasyLi text1='«Ангели»' text2='реж. 	О. Масленніков' />
								</StyledUl>
							</Box>
						</StyledFilmBox>

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
								<YouTubePlayer videoUrl='https://youtu.be/n9pyiP7WB4c' />
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

export default AndrewForm
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

const StyledFilmBox = styled(Box)(() => ({
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	gap: 16,
	margin: 5,
	padding: 5,

	'@media (max-width: 600px)': {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}))

const StyledUl = styled('ul')(() => ({
	display: 'flex',
	flexDirection: 'column',
	gap: 6,
	marginBottom: 12,
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
		<li style={{ borderBottom: '1px solid #d9d6ce', paddingBottom: 4 }}>
			<span style={{ fontWeight: 600, color: 'black' }}>{text1}</span> -{' '}
			<span style={{ fontSize: 12 }}>{text2}</span>
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
