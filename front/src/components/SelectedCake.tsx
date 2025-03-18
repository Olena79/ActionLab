import React, { useEffect } from 'react'
import { useTranslation } from '../translation/TranslationContext'
import { styled } from '@mui/system'
import { DialogTitle } from '@mui/material'
import { useCakeSelection } from '../context/CakeContext'
import ArrowRightAltTwoToneIcon from '@mui/icons-material/ArrowRightAltTwoTone'

const CakeBox = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
}))

const StyledMainTitle = styled(DialogTitle)(() => ({
	padding: 4,
	fontWeight: 700,
}))

const CakeHeader = styled('div')(() => ({
	textAlign: 'center',
}))

const ImageBox = styled('img')(() => ({
	width: 250,
	height: 160,
	borderRadius: 12,
}))

const StyledTitle = styled(DialogTitle)(() => ({
	padding: 4,
	fontWeight: 700,
}))

const CakeBoxInfo = styled('div')(() => ({
	display: 'grid',
	gridTemplateColumns: '95px 1fr',
	alignItems: 'end',
}))

const StyledNameInfo = styled('span')(() => ({
	color: 'grey',
}))

const StyledInfo = styled('span')(() => ({
	fontWeight: 600,
}))

const SelectedCake: React.FC = () => {
	const { t, lang } = useTranslation()
	const { mode, selectedCake, ingredients, setSelectedCake, setIngredients } =
		useCakeSelection()

	useEffect(() => {
		const storedMode = sessionStorage.getItem('mode') as 'classic' | 'custom'
		const storedCake = sessionStorage.getItem('selectedCake')
		const storedIngredients = sessionStorage.getItem('ingredients')

		if (storedMode === 'classic' && storedCake) {
			setSelectedCake(JSON.parse(storedCake))
		} else if (storedMode === 'custom' && storedIngredients) {
			setIngredients(JSON.parse(storedIngredients))
		}
	}, [setSelectedCake, setIngredients])

	useEffect(() => {
		sessionStorage.setItem('mode', mode)
		if (mode === 'classic') {
			sessionStorage.setItem('selectedCake', JSON.stringify(selectedCake))
			sessionStorage.removeItem('ingredients')
		} else {
			// Виконуємо це тільки при фактичних змінах ingredients
			const currentIngredientsJson = JSON.stringify(ingredients)
			const storedIngredientsJson = sessionStorage.getItem('ingredients')

			if (currentIngredientsJson !== storedIngredientsJson) {
				sessionStorage.setItem('ingredients', currentIngredientsJson)
			}
			sessionStorage.removeItem('selectedCake')
		}
	}, [mode, selectedCake, ingredients])

	return (
		<>
			{mode === 'classic' && selectedCake ? (
				<CakeBox>
					<CakeHeader>
						<StyledMainTitle>{t('selected_filling')}</StyledMainTitle>
						<ImageBox
							src={selectedCake.img}
							alt={selectedCake[`cakeName${lang}`]}
						/>
						<StyledTitle>{selectedCake[`cakeName${lang}`]}</StyledTitle>
					</CakeHeader>

					<CakeBoxInfo>
						<StyledNameInfo>{t('dough')}:</StyledNameInfo>
						<StyledInfo>{selectedCake[`dough${lang}`]}</StyledInfo>

						<StyledNameInfo>{t('cream')}:</StyledNameInfo>
						<StyledInfo>{selectedCake[`cream${lang}`]}</StyledInfo>

						{selectedCake[`layer${lang}`] && (
							<>
								<StyledNameInfo>{t('layer')}:</StyledNameInfo>
								<StyledInfo>{selectedCake[`layer${lang}`]}</StyledInfo>
							</>
						)}

						{selectedCake[`topping${lang}`] && (
							<>
								<StyledNameInfo>{t('topping')}:</StyledNameInfo>
								<StyledInfo>{selectedCake[`topping${lang}`]}</StyledInfo>
							</>
						)}

						{selectedCake[`decor${lang}`] && (
							<>
								<StyledNameInfo>{t('decor')}:</StyledNameInfo>
								<StyledInfo>{selectedCake[`decor${lang}`]}</StyledInfo>
							</>
						)}
					</CakeBoxInfo>
				</CakeBox>
			) : mode === 'custom' && Object.keys(ingredients).length > 0 ? (
				<CakeBox>
					<StyledMainTitle>{t('selected_filling')}</StyledMainTitle>
					<CakeBoxInfo>
						<>
							<StyledNameInfo>{t('dough')}:</StyledNameInfo>
							<StyledInfo>{ingredients.dough}</StyledInfo>
						</>

						<>
							<StyledNameInfo>{t('doughFlavor')}:</StyledNameInfo>
							<StyledInfo>{ingredients.doughFlavor}</StyledInfo>
						</>

						<>
							<StyledNameInfo>{t('cream')}:</StyledNameInfo>
							<StyledInfo>{ingredients.cream}</StyledInfo>
						</>

						<>
							<StyledNameInfo>{t('creamFlavor')}:</StyledNameInfo>
							<StyledInfo>{ingredients.creamFlavor}</StyledInfo>
						</>

						{ingredients.extraDough && (
							<>
								<StyledNameInfo>{t('extraDough')}:</StyledNameInfo>
								<StyledInfo>{ingredients.extraDough}</StyledInfo>
							</>
						)}

						{ingredients.extraDoughFlavor && (
							<>
								<StyledNameInfo>{t('extraDoughFlavor')}:</StyledNameInfo>
								<StyledInfo>{ingredients.extraDoughFlavor}</StyledInfo>
							</>
						)}

						{ingredients.extraCream && (
							<>
								<StyledNameInfo>{t('extraCream')}:</StyledNameInfo>
								<StyledInfo>{ingredients.extraCream}</StyledInfo>
							</>
						)}

						{ingredients.extraCreamFlavor && (
							<>
								<StyledNameInfo>{t('extraCreamFlavor')}:</StyledNameInfo>
								<StyledInfo>{ingredients.extraCreamFlavor}</StyledInfo>
							</>
						)}

						{ingredients.layer1 && (
							<>
								<StyledNameInfo>{t('layer1')}:</StyledNameInfo>

								<StyledInfo>{ingredients.layer1}</StyledInfo>
							</>
						)}

						{ingredients.layer2 && (
							<>
								<StyledNameInfo>{t('layer2')}:</StyledNameInfo>

								<StyledInfo>{ingredients.layer2}</StyledInfo>
							</>
						)}

						{ingredients.layer3 && (
							<>
								<StyledNameInfo>{t('layer3')}:</StyledNameInfo>

								<StyledInfo>{ingredients.layer3}</StyledInfo>
							</>
						)}

						{ingredients.topping && (
							<>
								<StyledNameInfo>{t('topping')}:</StyledNameInfo>
								<StyledInfo>{ingredients.topping}</StyledInfo>
							</>
						)}

						{ingredients.toppingCream && (
							<>
								<StyledNameInfo>{t('toppingCream')}:</StyledNameInfo>
								<StyledInfo>{ingredients.toppingCream}</StyledInfo>
							</>
						)}

						{ingredients.toppingCreamFlavor && (
							<>
								<StyledNameInfo>{t('toppingCreamFlavor')}:</StyledNameInfo>
								<StyledInfo>{ingredients.toppingCreamFlavor}</StyledInfo>
							</>
						)}
					</CakeBoxInfo>
				</CakeBox>
			) : (
				<CakeHeader>
					<StyledTitle>{t('select_cake_to_view_details')}</StyledTitle>
					<ArrowRightAltTwoToneIcon />
				</CakeHeader>
			)}
		</>
	)
}
export default SelectedCake
