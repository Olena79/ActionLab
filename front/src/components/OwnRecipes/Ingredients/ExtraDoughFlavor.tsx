import React, { useEffect, useState } from 'react'
import { useTranslation } from '../../../translation/TranslationContext'
import { DialogTitle, styled } from '@mui/material'
import { ModalFlavors } from '../../FormModal'
import { fetchFlavors } from '../../../actions/ingredientsActions'
import { useCakeSelection, Ingredients } from '../../../context/CakeContext'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'
import ArrowRightAltTwoToneIcon from '@mui/icons-material/ArrowRightAltTwoTone'

const StyledBox = styled('section')(() => ({
	display: 'flex',
	flexDirection: 'column',
	gap: 12,
	alignItems: 'center',
	justifyContent: 'space-between',
	position: 'relative',
}))

const StyledFlavorsBox = styled('section')(() => ({
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gap: 24,
}))
const StyledHeader = styled('div')(() => ({
	display: 'flex',
	justifyContent: 'space-between',
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

const StyledAdsClickIconSmall = styled(ArrowDropDownCircleIcon)(() => ({
	color: 'black',
	cursor: 'pointer',
	width: 25,
	height: 25,
}))

const StyledTitleExtraDoughFlavor = styled(DialogTitle)(() => ({
	padding: 4,
	color: 'grey',
	fontSize: 14,
}))

const StyledFlavorsBlock = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'flex-end',
	gap: 4,
	borderBottom: '1px solid black',
	padding: '12px 4px',
}))

const StyledUl = styled('ul')(() => ({
	textAlign: 'start',
}))

const StyledLi = styled('li')(() => ({
	display: 'flex',
	alignItems: 'center',
	color: '#5c433d',
	background:
		'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(222,222,235,1) 92%, rgba(171,167,169,1) 100%)',
	fontSize: 18,
	padding: 4,
	transition: '0.5s',
	'&:hover': {
		background: 'rgba(171,167,169,1)',
		color: 'black',
		cursor: 'pointer',
	},
}))

type ExtraDoughFlavorType = {
	_id: string
	type: string
	name: string
	flavors: { extraDoughFlavor: string }[]
}
const ExtraDoughFlavor: React.FC = () => {
	const { t, lang } = useTranslation()
	const [openModalFlavors, setOpenModalFlavors] = useState(false)
	const [activeFlavor, setActiveFlavor] = useState<{
		_id: string
		flavors: any[]
	} | null>(null)
	const [dataFlavor, setDataFlavor] = useState<ExtraDoughFlavorType[]>([])
	const { setMode, setIngredients } = useCakeSelection()
	const [isVisible, setIsVisible] = useState(false)

	const handleOpenModalIngredient = (flavor: {
		_id: string
		flavors: any[]
	}) => {
		setActiveFlavor(flavor)
		setOpenModalFlavors(!openModalFlavors)
		setMode('custom')
	}

	const toggleVisibility = () => {
		setIsVisible(prev => !prev)
	}

	// const handleCloseModalIngedient = () => setOpenModalIngredient(false)

	useEffect(() => {
		fetchFlavors(lang)
			.then(data => {
				setDataFlavor(data)
			})
			.catch(error => {
				console.error('Помилка при отриманні смаків:', error)
			})
	}, [lang])

	const handleExtraDoughFlavorChoice = (choice: string) => {
		setIngredients((prevIngredients: Ingredients) => ({
			...prevIngredients,
			extraDoughFlavor: choice,
		}))

		setOpenModalFlavors(false)
	}

	return (
		<StyledBox>
			<StyledHeader>
				<StyledTitle>
					{t('title_extraDoughFlavors')}
					<ArrowRightAltTwoToneIcon />
				</StyledTitle>
				<StyledAdsClickIcon onClick={toggleVisibility} />
			</StyledHeader>

			{isVisible && (
				<>
					<StyledFlavorsBox>
						{dataFlavor ? (
							dataFlavor.map(flavorName => (
								<StyledFlavorsBlock key={flavorName._id}>
									<StyledTitleExtraDoughFlavor>
										{flavorName.name}
									</StyledTitleExtraDoughFlavor>
									<StyledAdsClickIconSmall
										onClick={() => handleOpenModalIngredient(flavorName)}
									/>
								</StyledFlavorsBlock>
							))
						) : (
							<span>{t('loading')}</span>
						)}
					</StyledFlavorsBox>
					{openModalFlavors && activeFlavor && (
						<ModalFlavors>
							<StyledUl>
								{activeFlavor.flavors.length > 0 ? (
									activeFlavor.flavors.map(variant => (
										<StyledLi
											key={variant.id || variant.flavor}
											onClick={() =>
												handleExtraDoughFlavorChoice(variant.flavor)
											}
										>
											{variant.flavor || t('noData')}
										</StyledLi>
									))
								) : (
									<span>{t('noData')}</span>
								)}
							</StyledUl>
						</ModalFlavors>
					)}
				</>
			)}
		</StyledBox>
	)
}

export default ExtraDoughFlavor
