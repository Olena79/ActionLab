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

const StyledTitleExtraDough = styled(DialogTitle)(() => ({
	padding: 4,
	color: 'grey',
	fontSize: 14,
}))

type ExtraDoughType = {
	_id: string
	type: string
	name: string
	variations: { extraDoughFlavor: string }[]
}
const ExtraDough: React.FC = () => {
	const { t, lang } = useTranslation()
	const [openModalExtraDough, setOpenModalExtraDough] = useState(false)
	const [isExtraDough, setIsExtraDough] = useState<ExtraDoughType | null>(null)
	const { setMode, setIngredients } = useCakeSelection()

	const handleOpenModalExtraDough = () => {
		setOpenModalExtraDough(!openModalExtraDough)
		setMode('custom')
	}

	useEffect(() => {
		if (!openModalExtraDough) return

		fetchIngredient('dough', lang)
			.then(data => {
				setIsExtraDough(data)
			})
			.catch(error => {
				console.error('Помилка при отриманні  додаткового тіста:', error)
			})
	}, [openModalExtraDough, lang])

	const handleExtraDoughChoice = (choice: string) => {
		setIngredients((prevIngredients: Ingredients) => ({
			...prevIngredients,
			extraDough: choice,
		}))
		setOpenModalExtraDough(false)
	}

	return (
		<StyledBox>
			<StyledTitle>
				{t('title_extraDough')}
				<ArrowRightAltTwoToneIcon />
			</StyledTitle>
			<StyledAdsClickIcon onClick={handleOpenModalExtraDough} />
			{openModalExtraDough && (
				<ModalIngredient>
					{isExtraDough && isExtraDough.variations?.length > 0 ? (
						<>
							<StyledTitleExtraDough>{isExtraDough.name}</StyledTitleExtraDough>
							<IngredientCard
								onClick={value => handleExtraDoughChoice(value)}
								variations={isExtraDough.variations}
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

export default ExtraDough
