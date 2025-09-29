import React from 'react'
import { Box, styled } from '@mui/material'
import { useTranslation } from '../../translation/TranslationContext'

const InfoBlock2: React.FC = () => {
	const { t } = useTranslation()
	const texts = [
		'infoBlock.block1.text1.text1',
		'infoBlock.block1.text2.text1',
		'infoBlock.block1.text3.text1',
		'infoBlock.block1.text4.text1',
		'infoBlock.block1.text5.text1',
		'infoBlock.block1.text6.text1',
	]

	return (
		<StyledBlock2>
			<StyledBlockTytle>{t('infoBlock.block2.title')}</StyledBlockTytle>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 3,
					marginBottom: 3,
				}}
			>
				{texts.map((group, idx) => (
					<StyledBlock11 key={idx}>
						<img
							src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759157557/dfbgm4353_djeebm.png'
							alt='Circle'
							width={25}
							height={25}
						/>
						<StyledBlock11Texts>
							<span style={{ marginRight: 4 }} key={idx}>
								{t(group)}
							</span>
						</StyledBlock11Texts>
					</StyledBlock11>
				))}
			</Box>
			<StyledDescBox>
				<StyledDesc>{t('infoBlock.block2.desc1')}</StyledDesc>
				<StyledDesc>{t('infoBlock.block2.desc2')}</StyledDesc>
				<StyledDesc>{t('infoBlock.block2.desc3')}</StyledDesc>
			</StyledDescBox>

			<LastInfoBlock>
				<StyledDesc2>{t('infoBlock.block3.desc1')}</StyledDesc2>
				{/* <StyledDesc2>{t('infoBlock.block3.desc2')}</StyledDesc2>
				<StyledDesc2>{t('infoBlock.block3.desc3')}</StyledDesc2> */}
			</LastInfoBlock>
		</StyledBlock2>
	)
}

export default InfoBlock2
//=======================   =====================//

const StyledBlock2 = styled('div')(({ theme }) => ({
	width: '100%',
	padding: 20,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: 18,

	backgroundImage:
		'url(https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758100013/fon3_bp7wy8.png)',
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center bottom',

	'@media (max-width: 900px)': {},
	'@media (max-width: 600px)': {},
}))

const StyledBlockTytle = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.secondary.main,
	fontSize: 20,
	fontWeight: 700,
	padding: '12px 16px',
	borderRadius: 26,
	textAlign: 'center',
}))

const StyledDescBox = styled('div')(({ theme }) => ({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-around',
	gap: 12,

	'@media (max-width: 600px)': {
		flexDirection: 'column',
		width: 'fit-content',
		alignItems: 'center',
	},
}))

const StyledDesc = styled('div')(({ theme }) => ({
	border: `1px solid ${theme.palette.secondary.main}`,
	padding: '12px 16px',
	borderRadius: 26,
	color: theme.palette.primary.main,
	fontSize: 20,
	fontWeight: 700,
	'@media (max-width: 800px) and (min-width: 600px)': {
		fontSize: 16,
	},
}))

const LastInfoBlock = styled('div')(({ theme }) => ({
	margin: '30px 0',
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	gap: 26,

	'@media (max-width: 600px)': {},
}))

const StyledDesc2 = styled('div')(({ theme }) => ({
	textAlign: 'center',
	fontSize: 16,
	fontWeight: 600,
	'@media (max-width: 800px) and (min-width: 600px)': {},
}))

const StyledBlock11 = styled('div')(({ theme }) => ({
	display: 'flex',
	gap: 16,
	alignItems: 'center',

	'&:nth-of-type(even)': {
		marginLeft: 150,
	},
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
