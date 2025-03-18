import React, { useState } from 'react'
import { useTranslation } from '../../translation/TranslationContext'
import { styled } from '@mui/system'
import ClassicCakesCatalog from './ClassicCakesCatalog'
import { ModalButtonClassicRecipes } from '../FormModal'
import { useCakeSelection } from '../../context/CakeContext'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'
import { DialogTitle } from '@mui/material'
import ArrowRightAltTwoToneIcon from '@mui/icons-material/ArrowRightAltTwoTone'

const StyledClassicRecipesBox = styled('section')(() => ({
	textTransform: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	width: 600,
	border: '1px solid #c2a6a3',
	borderRadius: 12,
	padding: '20px 8px',
	position: 'relative',
}))

const StyledClassicRecipesTitle = styled(DialogTitle)(() => ({
	color: '#662923',
	fontWeight: 800,
	display: 'flex',
	alignItems: 'center',
	gap: 12,
}))

const StyledClassicRecipesIcon = styled(ArrowDropDownCircleIcon)(() => ({
	width: 50,
	height: 50,
	color: '#662923',
	transition: '0.5s',
	'&:hover': {
		color: 'grey',
		cursor: 'pointer',
	},
}))

const ButtonClassicRecipes: React.FC = () => {
	const [openModal, setOpenModal] = useState(false)
	const { setMode } = useCakeSelection()

	const { t } = useTranslation()

	const handleOpenModal = () => {
		setOpenModal(!openModal)
		setMode('classic')
	}

	const handleCloseModal = () => {
		setOpenModal(false)
	}

	return (
		<StyledClassicRecipesBox>
			<StyledClassicRecipesTitle>
				{t('choose_filling_classic')}
				<ArrowRightAltTwoToneIcon />
			</StyledClassicRecipesTitle>
			<StyledClassicRecipesIcon onClick={handleOpenModal} />
			{openModal && (
				<ModalButtonClassicRecipes>
					<ClassicCakesCatalog onClick={handleCloseModal} />
				</ModalButtonClassicRecipes>
			)}
		</StyledClassicRecipesBox>
	)
}

export default ButtonClassicRecipes
