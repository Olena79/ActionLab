import React from 'react'
import { Box, styled, useMediaQuery } from '@mui/material'

const Block3: React.FC = () => {
	const isMobile = useMediaQuery('(max-width:778px)')
	return (
		<>
			<ContentWrapper>
				<ContentTitle sx={{ textAlign: 'center' }}>
					Для кого ці заняття
				</ContentTitle>
				<ContentBodyGrid>
					<ContentWrapperGrid>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761472156/arrowLeft_vd1kal.png'
							alt='Icon'
							height={50}
						/>
						<ContentSubtitle sx={{ textAlign: 'center' }}>
							Для тих, хто хоче опанувати контроль над тілом та емоціями
						</ContentSubtitle>
					</ContentWrapperGrid>
					<ContentWrapperGrid>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761472156/arrowDown_gwyc9f.png'
							alt='Icon'
							height={50}
						/>
						<ContentSubtitle sx={{ textAlign: 'center' }}>
							Для людей, що прагнуть нестандартного інтенсивного тренування
						</ContentSubtitle>
					</ContentWrapperGrid>
					<ContentWrapperGrid>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761472156/arrowRight_kmd4ij.png'
							alt='Icon'
							height={50}
						/>
						<ContentSubtitle sx={{ textAlign: 'center' }}>
							Для акторів, танцюристів, каскадерів-початківців
						</ContentSubtitle>
					</ContentWrapperGrid>
				</ContentBodyGrid>
			</ContentWrapper>

			<ContentWrapper
				sx={{
					gap: 8,
					position: 'relative',
					'@media (max-width: 600px)': { gap: 4 },
				}}
			>
				<ContentTitle sx={{ textAlign: 'center' }}>Ви отримаєте</ContentTitle>
				{isMobile ? (
					<>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761496131/MV1_bwqian.png'
							alt='Arrows'
							height={60}
							style={{
								position: 'absolute',
								top: 50,
								left: '8%',
							}}
						/>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761496885/MV2_m94xot.png'
							alt='Arrows'
							height={60}
							style={{
								position: 'absolute',
								top: 140,
								right: '5%',
							}}
						/>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761497166/MV3_etnras.png'
							alt='Arrows'
							height={50}
							style={{
								position: 'absolute',
								top: 250,
								left: '3%',
							}}
						/>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761497315/MV4_sya9ba.png'
							alt='Arrows'
							height={80}
							style={{
								position: 'absolute',
								top: 350,
								right: '2%',
							}}
						/>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761497453/MV5_fuvnfq.png'
							alt='Arrows'
							height={80}
							style={{
								position: 'absolute',
								top: 450,
								left: '3%',
							}}
						/>
					</>
				) : (
					<>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761494431/2Sides_uanxuw.png'
							alt='Arrows'
							height={60}
							style={{
								position: isMobile ? 'inherit' : 'absolute',
								top: 70,
								left: 'calc(50% - 70px)',
							}}
						/>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761495083/1Down_uygiav.png'
							alt='Arrow Down'
							height={120}
							style={{
								position: 'absolute',
								top: 140,
								left: 'calc(50% - 15px)',
							}}
						/>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761495450/AL_qb3upz.png'
							alt='Arrow Down'
							height={60}
							style={{
								position: 'absolute',
								top: 340,
								right: 'calc(50% - 150px)',
							}}
						/>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761495451/AR_rkuokp.png'
							alt='Arrow Down'
							height={60}
							style={{
								position: 'absolute',
								top: 340,
								left: 'calc(50% - 150px)',
							}}
						/>
					</>
				)}

				<ContentWrapperGet>
					<InfoItem>
						<span style={{ textAlign: 'center', marginRight: 8 }}>
							Безпечна техніка падінь і кидків
						</span>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761491139/Vector_bzteup.svg'
							alt='Falling'
							height={30}
						/>
					</InfoItem>
					<InfoItem>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761492249/R1_zps5sc.svg'
							alt='Fight'
							height={20}
						/>
						<span style={{ textAlign: 'center', margin: '0 8px' }}>
							Підвищена витривалість і координація
						</span>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761492249/R2_kpeskr.svg'
							alt='Fight'
							height={30}
						/>
					</InfoItem>
				</ContentWrapperGet>
				<ContentWrapperGet>
					<InfoItem>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761491480/F1_j4j7zf.svg'
							alt='Fight'
							height={30}
						/>
						<span style={{ textAlign: 'center', margin: '0 8px' }}>
							Плавний прогрес від бази до постановки бойових сцен
						</span>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761491480/F2_ow0le3.svg'
							alt='Fight'
							height={30}
						/>
					</InfoItem>
				</ContentWrapperGet>
				<ContentWrapperGet>
					<InfoItem>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761492533/W1_xdwbne.svg'
							alt='Fight'
							height={30}
						/>
						<span style={{ textAlign: 'center', margin: '0 8px' }}>
							Навички роботи зі зброєю (імітація та безпека)
						</span>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761492533/W2_ohdabf.svg'
							alt='Fight'
							height={30}
						/>
					</InfoItem>
					<InfoItem>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761492671/V_z8pakm.svg'
							alt='Fight'
							height={30}
						/>
						<span style={{ textAlign: 'center', marginLeft: 8 }}>
							Відео ваших виступів — можливість показати результат
						</span>
					</InfoItem>
				</ContentWrapperGet>
			</ContentWrapper>
		</>
	)
}

export default Block3
//==========================

const ContentBodyGrid = styled(Box)(() => ({
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	justifyItems: 'center',
	alignItems: 'start',
	'@media (max-width: 600px)': {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'end',
	},
}))

const ContentWrapperGrid = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	gap: 12,
	alignItems: 'center',
}))

const ContentWrapperGet = styled(Box)(() => ({
	display: 'flex',
	gap: 12,
	alignItems: 'center',
	justifyContent: 'space-around',
	'@media (max-width: 778px)': {
		flexDirection: 'column',
		gap: 30,
	},
}))

const InfoItem = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '50%',
	color: theme.palette.primary.main,
	padding: '16px 8px',
	boxShadow: 'inset -5px -4px 34px -8px rgba(255,224,29,0.6)',
	minHeight: 70,
	fontSize: 14,
	'@media (max-width: 778px)': {
		width: '80%',
	},
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
