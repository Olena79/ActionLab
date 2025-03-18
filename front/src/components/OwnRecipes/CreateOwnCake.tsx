import { styled } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from '../../translation/TranslationContext'
import Dough from './Ingredients/Dough'
import DoughFlavor from './Ingredients/DoughFlavor'
import Cream from './Ingredients/Cream'
import CreamFlavor from './Ingredients/CreamFlavor'
import Line from '../Line'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'
import ExtraDough from './Ingredients/ExtraDough'
import ExtraDoughFlavor from './Ingredients/ExtraDoughFlavor'
import ExtraCream from './Ingredients/ExtraCream'
import ExtraCreamFlavor from './Ingredients/ExtraCreamFlavor'
import Layer1 from './Ingredients/Layer1'
import Layer2 from './Ingredients/Layer2'
import Topping from './Ingredients/Topping'

const StyledCreateOwnCake = styled('section')(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: 20,
}))

const StyledLine = styled(Line)(() => ({
	width: 580,
}))

const StyledExtraIngridients = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: 12,
	padding: 12,
}))

const StyledH1 = styled('h1')(() => ({
	fontSize: 20,
	fontWeight: 700,
	width: 400,
	textAlign: 'center',
	color: '#662923',
}))

const StyledAdsClickIcon = styled(ArrowDropDownCircleIcon)(() => ({
	width: 40,
	height: 40,
	color: '#3b1713',

	transition: '0.5s',
	'&:hover': {
		color: 'grey',
		cursor: 'pointer',
	},
}))

const CreateOwnCake: React.FC = () => {
	const { t } = useTranslation()
	const [isVisible, setIsVisible] = useState(false)

	const toggleVisibility = () => {
		setIsVisible(prev => !prev)
	}

	return (
		<StyledCreateOwnCake>
			<Dough />
			<StyledLine />
			<DoughFlavor />
			<StyledLine />
			<Cream />
			<StyledLine />
			<CreamFlavor />
			<StyledLine />
			<StyledExtraIngridients>
				<StyledH1>{t('title_extraIngredients')}</StyledH1>
				<StyledAdsClickIcon onClick={toggleVisibility} />
				{isVisible && (
					<>
						<ExtraDough />
						<ExtraDoughFlavor />
						<ExtraCream />
						<ExtraCreamFlavor />
					</>
				)}
			</StyledExtraIngridients>
			<StyledLine />
			<Layer1 />
			<StyledLine />
			<Layer2 />
			<StyledLine />
			<Topping />
		</StyledCreateOwnCake>
	)
}

export default CreateOwnCake
