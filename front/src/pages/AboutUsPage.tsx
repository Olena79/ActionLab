import React from 'react'
import { Box, styled } from '@mui/system'
import FloatingButton from '../components/FloatingButton'
import { Typography } from '@mui/material'
import ImageCarousel from '../components/ImageCarousel'
import YouTubePlayer from '../components/YouTubePlayer'

const AboutUsPage: React.FC = () => {
	return (
		<StyledPage>
			<FloatingButton />
			<StyledBox>
				<StyledInfoBox sx={{ alignItems: 'flex-end', boxShadow: 'none' }}>
					<h3>Тренер:</h3>
					<h1 style={{ fontSize: 24, fontWeight: 600 }}>Андрій Безверхній</h1>
				</StyledInfoBox>

				<StyledInfoBox>
					<Box sx={{ width: 310, height: 310 }}>
						<ImageCarousel />
					</Box>

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
						</Typography>
						<Typography sx={{ fontSize: 14 }}>
							Паралельно розвивався в освіті: спершу як помічник тренера
							семінарів сценічного руху, згодом — як тренер. Виробив власний
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

				<Typography variant='h5' sx={{ textAlign: 'center' }}>
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
							<EasyLi text1='«Дивлячись вдалину»' text2='реж. В. Мельниченко' />
							<EasyLi text1='«Чорний ворон»' text2='реж. О. Березань' />
							<EasyLi text1='«Юрчишини»' text2='реж. О. Березань' />
							<EasyLi
								text1='«Дуже брехлива історія»'
								text2='реж. О. Березань'
							/>
							<EasyLi text1='«Джура Королевич»' text2='реж. А. Гойда' />
							<EasyLi text1='«Карпатський Рейнджер»' text2='реж. С. Крутін' />
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
							<EasyLi text1='«Ангели»' text2='реж.' />
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
			</StyledBox>
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
	padding: 12,
}))

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
	gap: 16,
	margin: 5,
	padding: 5,

	'@media (max-width: 600px)': {
		flexDirection: 'column',
		alignItems: 'center',
	},
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
