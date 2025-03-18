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

const StyledTitleExtraCream = styled(DialogTitle)(() => ({
	padding: 4,
	color: 'grey',
	fontSize: 14,
}))

type ExtraCreamType = {
	_id: string
	type: string
	name: string
	variations: { extraCream: string }[]
}
const ExtraCream: React.FC = () => {
	const { t, lang } = useTranslation()
	const [openModalExtraCream, setOpenModalExtraCream] = useState(false)
	const [isExtraCream, setIsExtraCream] = useState<ExtraCreamType | null>(null)
	const { setMode, setIngredients } = useCakeSelection()

	const handleOpenModalExtraCream = () => {
		setOpenModalExtraCream(!openModalExtraCream)
		setMode('custom')
	}

	useEffect(() => {
		if (!openModalExtraCream) return

		fetchIngredient('cream', lang)
			.then(data => {
				setIsExtraCream(data)
			})
			.catch(error => {
				console.error('Помилка при отриманні додаткового крему:', error)
			})
	}, [openModalExtraCream, lang])

	const handleExtraCreamChoice = (choice: string) => {
		setIngredients((prevIngredients: Ingredients) => ({
			...prevIngredients,
			extraCream: choice,
		}))
		setOpenModalExtraCream(false)
	}

	return (
		<StyledBox>
			<StyledTitle>
				{t('title_extraCream')}
				<ArrowRightAltTwoToneIcon />
			</StyledTitle>
			<StyledAdsClickIcon onClick={handleOpenModalExtraCream} />
			{openModalExtraCream && (
				<ModalIngredient>
					{isExtraCream && isExtraCream.variations?.length > 0 ? (
						<>
							<StyledTitleExtraCream>{isExtraCream.name}</StyledTitleExtraCream>
							<IngredientCard
								onClick={value => handleExtraCreamChoice(value)}
								variations={isExtraCream.variations}
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

export default ExtraCream
