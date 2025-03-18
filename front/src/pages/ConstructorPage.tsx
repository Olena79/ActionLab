import React from 'react'
import { useTranslation } from '../translation/TranslationContext'
import { styled } from '@mui/system'
import { DialogTitle, DialogContentText } from '@mui/material'
import ReactPlayer from 'react-player'
import Line from '../components/Line'
import ButtonClassicRecipes from '../components/ClassicRecipes/ButtonClassicRecipes'
import ButtonOwnRecipes from '../components/OwnRecipes/ButtonOwnRecipes'
import SelectedCake from '../components/SelectedCake'
import { useCakeSelection } from '../context/CakeContext'

const StyledPage = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
}))

const StyledTitle = styled(DialogTitle)(() => ({
	fontSize: '1.5rem',
	color: '#583E26',
	fontWeight: 'bold',
}))

const StyledTitleOr = styled('h3')(() => ({
	fontSize: '1.5rem',
	color: '#583E26',
	fontWeight: 'bold',
	border: '1px solid #583E26',
	borderRadius: '50%',
	padding: 12,
}))
const StyledTitleSteps = styled('h4')(() => ({
	fontSize: '1.5rem',
	color: '#583E26',
	fontWeight: 'bold',
	borderBottom: '1px solid #583E26',
	paddingBottom: 4,
	margin: '30px 0',
}))

const StyledDescription = styled(DialogContentText)(() => ({
	fontSize: 14,
	color: '#583E26',
}))

const VideoBox = styled('div')(() => ({
	margin: 24,
	backgroundColor: 'black',
	padding: 12,
	borderRadius: 12,
	border: '7px solid #F1BAA1',
}))

const VideoComponent = () => {
	return (
		<ReactPlayer url='https://www.youtube.com/watch?v=vvNMOcZLOak' controls />
	)
}

const StyledConstructor = styled('section')(() => ({
	display: 'grid',
	gridTemplateColumns: '350px 1fr',
	width: '100%',
	gap: 24,
	position: 'relative',
}))

const StyledLeftSide = styled('div')(() => ({
	backgroundColor: '#fae8f9',
	padding: 12,
	borderRadius: 12,
	position: 'sticky',
	top: 20,
	alignSelf: 'start',
	height: 'fit-content',
}))

const StyledRightSide = styled('div')(() => ({
	padding: 12,
	borderLeft: '1px solid grey',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'space-around',
}))

const StyledButtonGroup = styled('div')(() => ({
	paddingTop: 24,
	display: 'flex',
	flexDirection: 'column',
	gap: 20,
	alignItems: 'center',
}))

const StyledLine = styled(Line)(() => ({
	width: 1100,
}))

const ConstructorPage: React.FC = () => {
	const { t } = useTranslation()
	const { mode } = useCakeSelection()

	return (
		<StyledPage>
			<StyledTitle>{t('hello')}</StyledTitle>

			<StyledDescription>{t('mainDescription1')}</StyledDescription>
			<StyledDescription>{t('mainDescription2')}</StyledDescription>
			<StyledDescription>{t('mainDescription3')}</StyledDescription>
			<StyledDescription>{t('mainDescription4')}</StyledDescription>
			<StyledDescription>{t('mainDescription5')}</StyledDescription>

			<VideoBox>
				<VideoComponent />
			</VideoBox>

			<StyledLine />

			<StyledTitle>{t('mainTitle')}</StyledTitle>
			<StyledConstructor>
				<StyledLeftSide>
					<SelectedCake />
				</StyledLeftSide>

				<StyledRightSide>
					<StyledTitleSteps>{t('choose_filling')}</StyledTitleSteps>
					<StyledButtonGroup>
						<ButtonClassicRecipes />
						<StyledTitleOr>{t('or')}</StyledTitleOr>
						<ButtonOwnRecipes />
					</StyledButtonGroup>

					<StyledTitleSteps>{t('choose_form')}</StyledTitleSteps>
				</StyledRightSide>
			</StyledConstructor>
		</StyledPage>
	)
}

export default ConstructorPage
