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

const StyledTitleDough = styled(DialogTitle)(() => ({
	padding: 4,
	color: 'grey',
	fontSize: 14,
}))

type DoughType = {
	_id: string
	type: string
	name: string
	variations: { dough: string }[]
}
const Dough: React.FC = () => {
	const { t, lang } = useTranslation()
	const [openModalDough, setOpenModalDough] = useState(false)
	const [isDough, setIsDough] = useState<DoughType | null>(null)
	const { setMode, setIngredients } = useCakeSelection()

	const handleOpenModalDough = () => {
		setOpenModalDough(!openModalDough)
		setMode('custom')
	}

	useEffect(() => {
		if (!openModalDough) return

		fetchIngredient('dough', lang)
			.then(data => {
				setIsDough(data)
			})
			.catch(error => {
				console.error('Помилка при отриманні тіста:', error)
			})
	}, [openModalDough, lang])

	const handleDoughChoice = (choice: string) => {
		setIngredients((prevIngredients: Ingredients) => ({
			...prevIngredients,
			dough: choice,
		}))
		setOpenModalDough(false)
	}

	// const handleCloseModalDough = () => {
	// 	setOpenModalDough(false)
	// }

	return (
		<StyledBox>
			<StyledTitle>
				{t('title_dough')}
				<ArrowRightAltTwoToneIcon />
			</StyledTitle>
			<StyledAdsClickIcon onClick={handleOpenModalDough} />
			{openModalDough && (
				<ModalIngredient>
					{isDough && isDough.variations?.length > 0 ? (
						<>
							<StyledTitleDough>{isDough.name}</StyledTitleDough>
							<IngredientCard
								onClick={value => handleDoughChoice(value)}
								variations={isDough.variations}
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

export default Dough
