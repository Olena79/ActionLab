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

type Layer1Type = {
	_id: string
	type: string
	name: string
	variations: { layer1: string }[]
}
const Layer1: React.FC = () => {
	const { t, lang } = useTranslation()
	const [openModalLayers, setOpenModalLayers] = useState(false)
	const [isLayer1, setIsLayer1] = useState<Layer1Type | null>(null)
	const { setMode, setIngredients } = useCakeSelection()

	const handleOpenModalLayer1 = () => {
		setOpenModalLayers(!openModalLayers)
		setMode('custom')
	}

	useEffect(() => {
		if (!openModalLayers) return

		fetchIngredient('layers', lang)
			.then(data => {
				setIsLayer1(data)
			})
			.catch(error => {
				console.error('Помилка при отриманні прошарку 1:', error)
			})
	}, [openModalLayers, lang])

	const handleLayer1Choice = (choice: string) => {
		setIngredients((prevIngredients: Ingredients) => ({
			...prevIngredients,
			layer1: choice,
		}))
		setOpenModalLayers(false)
	}

	return (
		<StyledBox>
			<StyledTitle>
				{t('title_layers')}
				<ArrowRightAltTwoToneIcon />
			</StyledTitle>
			<StyledAdsClickIcon onClick={handleOpenModalLayer1} />
			{openModalLayers && (
				<ModalIngredient>
					{isLayer1 && isLayer1.variations?.length > 0 ? (
						<>
							<StyledTitleLayers>{isLayer1.name}</StyledTitleLayers>
							<IngredientCard
								onClick={value => handleLayer1Choice(value)}
								variations={isLayer1.variations}
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

export default Layer1
