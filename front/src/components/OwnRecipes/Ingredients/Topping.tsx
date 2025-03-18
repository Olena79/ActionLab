import React, { useEffect, useState } from 'react'
import { useTranslation } from '../../../translation/TranslationContext'
import { DialogTitle, styled } from '@mui/material'
import { ModalIngredient } from '../../FormModal'
import { fetchIngredient } from '../../../actions/ingredientsActions'
import { IngredientCard } from '../IngredientCard'
import { useCakeSelection, Ingredients } from '../../../context/CakeContext'
import ArrowRightAltTwoToneIcon from '@mui/icons-material/ArrowRightAltTwoTone'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'
import ToppingCream from './ToppingCream'
import ToppingCreamFlavor from './ToppingCreamFlavor'

const StyledBox = styled('section')(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	position: 'relative',
	width: 550,
}))

const StyledTitle = styled(DialogTitle)(() => ({
	padding: 4,
	fontSize: 18,
	color: '#3b1713',
	display: 'flex',
	alignItems: 'center',
	gap: 12,
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

const StyledTitleTopping = styled(DialogTitle)(() => ({
	padding: 4,
	color: 'grey',
	fontSize: 14,
}))

type ToppingType = {
	_id: string
	type: string
	name: string
	variations: { topping: string }[]
}
const Topping: React.FC = () => {
	const { t, lang } = useTranslation()
	const [openModalTopping, setOpenModalTopping] = useState(false)
	const [isTopping, setIsTopping] = useState<ToppingType | null>(null)
	const [isVisible, setIsVisible] = useState(false)
	const { setMode, ingredients, setIngredients } = useCakeSelection()

	const handleOpenModalTopping = () => {
		setOpenModalTopping(!openModalTopping)
		setMode('custom')
	}

	useEffect(() => {}, [])

	useEffect(() => {
		if (!openModalTopping) return

		fetchIngredient('topping', lang)
			.then(data => {
				setIsTopping(data)
			})
			.catch(error => {
				console.error('Помилка при отриманні прошарку 1:', error)
			})
	}, [openModalTopping, lang])

	const handleToppingChoice = (choice: string) => {
		setIngredients((prevIngredients: Ingredients) => ({
			...prevIngredients,
			topping: choice,
		}))
		setOpenModalTopping(false)
	}

	useEffect(() => {
		if (ingredients.topping === `${t('cream')}`) {
			setIsVisible(true)
		} else {
			setIsVisible(false)
		}
	}, [t, ingredients.topping])

	return (
		<>
			<StyledBox>
				<StyledTitle>
					{t('title_topping')}
					<ArrowRightAltTwoToneIcon />
				</StyledTitle>
				<StyledAdsClickIcon onClick={handleOpenModalTopping} />
				{openModalTopping && (
					<ModalIngredient>
						{isTopping && isTopping.variations?.length > 0 ? (
							<>
								<StyledTitleTopping>{isTopping.name}</StyledTitleTopping>
								<IngredientCard
									onClick={value => handleToppingChoice(value)}
									variations={isTopping.variations}
									lang={lang}
								/>
							</>
						) : (
							<span>{t('loading')}</span>
						)}
					</ModalIngredient>
				)}
			</StyledBox>

			{isVisible && (
				<>
					<ToppingCream /> <ToppingCreamFlavor />
				</>
			)}
		</>
	)
}

export default Topping
