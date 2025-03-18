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

const StyledTitleCream = styled(DialogTitle)(() => ({
	padding: 4,
	color: 'grey',
	fontSize: 14,
}))

type CreamType = {
	_id: string
	type: string
	name: string
	variations: { cream: string }[]
}
const Cream: React.FC = () => {
	const { t, lang } = useTranslation()
	const [openModalCream, setOpenModalCream] = useState(false)
	const [isCream, setIsCream] = useState<CreamType | null>(null)
	const { setMode, setIngredients } = useCakeSelection()

	const handleOpenModalCream = () => {
		setOpenModalCream(!openModalCream)
		setMode('custom')
	}

	useEffect(() => {
		if (!openModalCream) return

		fetchIngredient('cream', lang)
			.then(data => {
				setIsCream(data)
			})
			.catch(error => {
				console.error('Помилка при отриманні крему:', error)
			})
	}, [openModalCream, lang])

	const handleCreamChoice = (choice: string) => {
		setIngredients((prevIngredients: Ingredients) => ({
			...prevIngredients,
			cream: choice,
		}))
		setOpenModalCream(false)
	}

	return (
		<StyledBox>
			<StyledTitle>
				{t('title_cream')}
				<ArrowRightAltTwoToneIcon />
			</StyledTitle>
			<StyledAdsClickIcon onClick={handleOpenModalCream} />
			{openModalCream && (
				<ModalIngredient>
					{isCream && isCream.variations?.length > 0 ? (
						<>
							<StyledTitleCream>{isCream.name}</StyledTitleCream>
							<IngredientCard
								onClick={value => handleCreamChoice(value)}
								variations={isCream.variations}
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

export default Cream
