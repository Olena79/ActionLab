import React, { useState } from 'react'
import { useTranslation } from '../../translation/TranslationContext'
import { styled } from '@mui/system'
import CreateOwnCake from './CreateOwnCake'
import { DialogTitle } from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'
import Line from '../Line'

const StyledOwnRecipesBox = styled('section')(() => ({
	textTransform: 'none',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'space-between',
	width: 600,
	border: '1px solid #c2a6a3',
	borderRadius: 12,
	padding: '20px 8px',
}))

const StyledOwnRecipesTitle = styled(DialogTitle)(() => ({
	color: '#662923',
	fontWeight: 800,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: 2,
}))

const StyledCakeSection = styled('div')(() => ({
	display: 'flex',
	justifyContent: 'space-around',
}))

const StyledCakeSectionItem = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
}))

const StyledSmallTitle = styled(DialogTitle)(() => ({
	color: '#662923',
	fontWeight: 600,
}))

const StyledClassicRecipesIcon = styled(ArrowDropDownCircleIcon)(() => ({
	width: 50,
	height: 50,
	color: '#662923',
	transition: '0.5s',
	'&:hover': {
		color: 'grey',
		cursor: 'pointer',
	},
}))

const ButtonOwnRecipes: React.FC = () => {
	const { t } = useTranslation()
	const [isOpenBisquitCake, setIsOpenBisquitCake] = useState(false)
	const [isOpenMousseCake, setIsOpenMousseCake] = useState(false)

	const toggleBisquitWindow = () => {
		setIsOpenBisquitCake(prev => !prev)
	}

	const toggleMousseWindow = () => {
		setIsOpenMousseCake(prev => !prev)
	}

	return (
		<>
			<StyledOwnRecipesTitle>
				{t('choose_filling_own')}
				<ArrowDownwardIcon />
			</StyledOwnRecipesTitle>
			<StyledCakeSection>
				<StyledCakeSectionItem>
					<StyledSmallTitle>{t('choose_bisquit_cake')}</StyledSmallTitle>
					<StyledClassicRecipesIcon onClick={toggleBisquitWindow} />
				</StyledCakeSectionItem>
				<StyledCakeSectionItem>
					<StyledSmallTitle>{t('choose_mousse_cake')}</StyledSmallTitle>
					<StyledClassicRecipesIcon onClick={toggleMousseWindow} />
				</StyledCakeSectionItem>
			</StyledCakeSection>

			{isOpenBisquitCake && (
				<StyledOwnRecipesBox>
					<CreateOwnCake />
				</StyledOwnRecipesBox>
			)}

			{isOpenMousseCake && <StyledOwnRecipesBox>111</StyledOwnRecipesBox>}

			<Line />
		</>
	)
}

export default ButtonOwnRecipes
