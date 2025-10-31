import React from 'react'
import { Box, styled, Typography } from '@mui/material'
import ButtonContained from '../ButtonContained'

interface Block1Props {
	onClick: () => void
}

const Block2: React.FC<Block1Props> = ({ onClick }) => {
	return (
		<FolderContent>
			<ContentWrapper>
				<ContentHeader>
					<ContentTitle>Про заняття</ContentTitle>
					<ContentSubtitle>
						Чому наші заняття — не просто тренування
					</ContentSubtitle>
					<HeaderImages>
						<ContentImage
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761375459/333333333_save_d06bzm.jpg'
							alt='Training'
						/>
						<ContentImage
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761375460/222222222222_save_zp7bct.jpg'
							alt='Training'
						/>
						<ContentImage
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761375459/11111111_save_mdotsi.jpg'
							alt='Training'
						/>
					</HeaderImages>
				</ContentHeader>

				<ContentBody>
					<Typography>
						Ми — професійні каскадери з багаторічним досвідом. Ми знаємо як
						необхідне фізичне навантаження зробити веселим! Активні ігри - ось
						як можна назвати наш підхід до тренувань. На заняттях ми не просто
						вчимо прийоми: ми створюємо сценічну хореографію, та крок за кроком
						відточуємо кожен рух. Паралельно ви отримуєте:
					</Typography>
					<SmallLi text='коректну фізичну підготовку та координацію;' />
					<SmallLi text='навички безпечних падінь і акробатики;' />
					<SmallLi text='роботу з різними типами холодної зброї;' />
					<SmallLi text='розвиток емоційної виразності та сценічного мислення;' />
					<Box sx={{ position: 'relative', pointerEvents: 'auto' }}>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761407388/ghhdjuky_hg85lk.png'
							alt='Border'
							width={'20%'}
							style={{
								position: 'absolute',
								pointerEvents: 'none',
								zIndex: 0,
							}}
						/>
						<TrainingInfoBox>
							<TrainingInfoTytle>Формат занять</TrainingInfoTytle>
							<div>
								<FatSpan>Групові:</FatSpan> <span>2 години,</span>
								<ThinSpan>1 раз на тиждень.</ThinSpan>
							</div>
							<div>
								<FatSpan>Індивідуальні:</FatSpan> <span>1.5 години,</span>
								<ThinSpan>1 раз на тиждень.</ThinSpan>
							</div>
							<div style={{ textAlign: 'center' }}>
								<TrainingInfoTytle>Ціна</TrainingInfoTytle>
								<ThinSpan>(абонемент на місяць)</ThinSpan>
							</div>
							<div>
								<FatSpan>Групові:</FatSpan> <span>4000 грн</span>
							</div>
							<div style={{ marginBottom: 12 }}>
								<FatSpan>Індивідуальні:</FatSpan>
								<span>4000 грн</span>
							</div>

							<div
								style={{
									fontSize: 12,
									fontStyle: 'italic',
									textAlign: 'center',
								}}
							>
								В кінці міні-курсу — демонстрація (мікро-екзамен). Кращі виступи
								— в нашому{' '}
								<a
									href='https://www.instagram.com/actionlabcourse?igsh=c29hYnh2c2todWpq'
									target='_blank'
									rel='noopener noreferrer'
									style={{ zIndex: 1 }}
								>
									Instagram
								</a>
							</div>
						</TrainingInfoBox>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761407388/fjdukudk_x4ly6k.png'
							alt='Border'
							width={'20%'}
							style={{
								position: 'absolute',
								right: 0,
								bottom: 0,
								zIndex: 0,
								pointerEvents: 'none',
							}}
						/>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<ButtonContained onClick={onClick} text='Купити абонемент' />
					</Box>
				</ContentBody>
			</ContentWrapper>
		</FolderContent>
	)
}

export default Block2
//==========================
const FolderContent = styled(Box)(() => ({
	backgroundColor: '#ffffff',
	borderRadius: '0 16px 16px 16px',
	boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
	minHeight: '600px',
	position: 'relative',
	overflow: 'hidden',
	border: '1px solid rgba(0,0,0,0.05)',
}))

const ContentWrapper = styled(Box)(() => ({
	width: '100%',
	height: '100%',
	padding: '32px',
	display: 'flex',
	flexDirection: 'column',
	gap: '24px',

	'@media (max-width: 768px)': {
		padding: '20px',
		gap: '16px',
	},
}))

const ContentHeader = styled(Box)(() => ({
	borderBottom: '2px solid #f0f0f0',
	paddingBottom: '20px',
}))

const ContentTitle = styled('h1')(() => ({
	fontSize: '32px',
	fontWeight: 700,
	color: '#2c3e50',
	margin: '0 0 8px 0',

	'@media (max-width: 768px)': {
		fontSize: '24px',
	},
}))

const ContentSubtitle = styled('p')(({ theme }) => ({
	fontSize: '16px',
	color: theme.palette.primary.main,
	margin: 0,
	lineHeight: 1.5,
	textAlign: 'end',
}))

const HeaderImages = styled(Box)(() => ({
	display: 'flex',
	marginTop: 12,
	gap: 12,
	flex: 1,
	justifyContent: 'center',
	'@media (max-width: 600px)': {
		flexDirection: 'column',
	},
}))

const ContentImage = styled('img')(() => ({
	borderRadius: 6,
	width: '30%',
	'@media (max-width: 600px)': {
		width: '100%',
	},
}))

const ContentBody = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	gap: 16,
	flex: 1,
}))

const TrainingInfoBox = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	gap: 8,
	padding: '20px 30px',

	'@media (max-width: 600px)': {
		padding: '20px 16px',
	},
}))

const TrainingInfoTytle = styled(Box)(() => ({
	fontWeight: 600,
	textAlign: 'center',
	marginBottom: 6,
}))

const FatSpan = styled('span')(() => ({
	fontWeight: 600,
}))

const ThinSpan = styled('span')(() => ({
	fontSize: 12,
}))
//=================================
interface SmallLiProps {
	text: string
}

const SmallLi: React.FC<SmallLiProps> = ({ text }) => {
	return (
		<div>
			<img
				src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759157557/dfbgm4353_djeebm.png'
				alt='Btn'
				width={20}
				height={20}
				style={{ marginRight: 4 }}
			/>
			{text}
		</div>
	)
}
