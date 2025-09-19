import React from 'react'
import { styled } from '@mui/material'
import { useTranslation } from '../../translation/TranslationContext'

const InfoBlock2: React.FC = () => {
	const { t } = useTranslation()

	return (
		<StyledBlock2>
			<StyledBlockTytle>{t('infoBlock.block2.title')}</StyledBlockTytle>
			<StyledDescBox>
				<StyledDesc>{t('infoBlock.block2.desc1')}</StyledDesc>
				<StyledDesc>{t('infoBlock.block2.desc2')}</StyledDesc>
				<StyledDesc>{t('infoBlock.block2.desc3')}</StyledDesc>
			</StyledDescBox>

			<LastInfoBlock>
				<StyledDesc2>{t('infoBlock.block3.desc1')}</StyledDesc2>
				<StyledDesc2>{t('infoBlock.block3.desc2')}</StyledDesc2>
				<StyledDesc2>{t('infoBlock.block3.desc3')}</StyledDesc2>
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
