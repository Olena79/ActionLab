import React, { useEffect, useState } from 'react'
import { useTranslation } from '../../../translation/TranslationContext'
import { DialogTitle, styled } from '@mui/material'
import { ModalIngredient } from '../../FormModal'
import { fetchIngredient } from '../../../actions/ingredientsActions'
import { IngredientCard } from '../IngredientCard'
import { useCakeSelection, Ingredients } from '../../../context/CakeContext'
import ArrowRightAltTwoToneIcon from '@mui/icons-material/ArrowRightAltTwoTone'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'

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

const StyledTitleLayers = styled(DialogTitle)(() => ({
	padding: 4,
	color: 'grey',
	fontSize: 14,
}))

type Layer2Type = {
	_id: string
	type: string
	name: string
	variations: { layer2: string; layer3: string }[]
}
const Layer2: React.FC = () => {
	const { t, lang } = useTranslation()
	const [openModalLayer2, setOpenModalLayer2] = useState(false)
	const [openModalLayer3, setOpenModalLayer3] = useState(false)
	const [isLayer2, setIsLayer2] = useState<Layer2Type | null>(null)
	const [isLayer3, setIsLayer3] = useState<Layer2Type | null>(null)
	const { setMode, setIngredients } = useCakeSelection()

	const handleOpenModalLayer2 = () => {
		setOpenModalLayer2(!openModalLayer2)
		setMode('custom')
	}
	const handleOpenModalLayer3 = () => {
		setOpenModalLayer3(!openModalLayer3)
		setMode('custom')
	}

	useEffect(() => {
		if (!openModalLayer2) return

		fetchIngredient('layers', lang)
			.then(data => {
				setIsLayer2(data)
			})
			.catch(error => {
				console.error('Помилка при отриманні прошарку 2:', error)
			})
	}, [openModalLayer2, lang])

	useEffect(() => {
		if (!openModalLayer3) return

		fetchIngredient('layers', lang)
			.then(data => {
				setIsLayer3(data)
			})
			.catch(error => {
				console.error('Помилка при отриманні прошарку 2:', error)
			})
	}, [openModalLayer3, lang])

	const handleLayer2Choice = (choice: string) => {
		setIngredients((prevIngredients: Ingredients) => ({
			...prevIngredients,
			layer2: choice,
		}))
		setOpenModalLayer2(false)
	}

	const handleLayer3Choice = (choice: string) => {
		setIngredients((prevIngredients: Ingredients) => ({
			...prevIngredients,
			layer3: choice,
		}))
		setOpenModalLayer3(false)
	}

	return (
		<StyledBox>
			<StyledTitle>
				{t('title_extraLayers')}
				<ArrowRightAltTwoToneIcon />
			</StyledTitle>
			<StyledAdsClickIcon onClick={handleOpenModalLayer2} />
			<StyledAdsClickIcon onClick={handleOpenModalLayer3} />

			{openModalLayer2 && (
				<ModalIngredient>
					{isLayer2 && isLayer2.variations?.length > 0 ? (
						<>
							<StyledTitleLayers>{isLayer2.name}</StyledTitleLayers>
							<IngredientCard
								onClick={value => handleLayer2Choice(value)}
								variations={isLayer2.variations}
								lang={lang}
							/>
						</>
					) : (
						<span>{t('loading')}</span>
					)}
				</ModalIngredient>
			)}

			{openModalLayer3 && (
				<ModalIngredient>
					{isLayer3 && isLayer3.variations?.length > 0 ? (
						<>
							<StyledTitleLayers>{isLayer3.name}</StyledTitleLayers>
							<IngredientCard
								onClick={value => handleLayer3Choice(value)}
								variations={isLayer3.variations}
								lang={lang}
							/>
						</>
					) : (
						<span>{t('loading')}</span>
					)}
				</ModalIngredient>
			)}
		</StyledBox>
	)
}

export default Layer2
