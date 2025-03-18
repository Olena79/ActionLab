import { styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from '../../translation/TranslationContext'
import { fetchCakes, fetchCakeById } from '../../actions/classic_cakeActions'
import { useCakeSelection } from '../../context/CakeContext'

const StyledCard = styled('div')(() => ({
	textTransform: 'none',
	width: 545,
	backgroundColor: 'white',
	border: '1px solid #d2d9d3',
	display: 'grid',
	gridTemplateColumns: '140px 1fr',
	color: 'black',
	cursor: 'pointer',
}))

const TitleImgBlock = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	gap: 12,
}))

const ImageBlock = styled('img')(() => ({
	width: 140,
	height: 90,
}))

const DescriptionBlock = styled('div')(() => ({
	fontStyle: 'oblique',
	paddingTop: 36,
}))

const StyledCatalog = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	gap: 4,
	backgroundColor: '#bec4bf',
}))

interface Cake {
	_id: string
	img: string
	[key: string]: string
}

interface CatalogCardProps {
	img: string
	description: string
	cakeName: string
	onClick: () => void
}

const CatalogCard: React.FC<CatalogCardProps> = ({
	img,
	description,
	cakeName,
	onClick,
}) => {
	console.log('Rendering Cake:', cakeName, description)
	return (
		<StyledCard onClick={onClick}>
			<TitleImgBlock>
				<h3>{cakeName}</h3>
				<ImageBlock src={img} alt='Cake' />
			</TitleImgBlock>

			<DescriptionBlock>{description}</DescriptionBlock>
		</StyledCard>
	)
}

interface ClassicCakesCatalogProps {
	onClick: () => void
}

const ClassicCakesCatalog: React.FC<ClassicCakesCatalogProps> = ({
	onClick,
}) => {
	const { t, lang } = useTranslation()
	const [cakes, setCakes] = useState<Cake[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const { setSelectedCake } = useCakeSelection()

	useEffect(() => {
		setCakes([])
		setLoading(true)

		const loadCakes = async () => {
			try {
				const data = await fetchCakes(lang)
				console.log('DATA: ', data)
				setCakes(data)
			} catch (err) {
				setError(t('error_download_cakes'))
			} finally {
				setLoading(false)
			}
		}

		loadCakes()
	}, [lang, t])

	const handleClick = async (_id: string) => {
		try {
			const cake = await fetchCakeById(_id, lang)
			setSelectedCake(cake)
		} catch (error) {
			console.error('Error fetching cake:', error)
		}
	}

	if (loading) return <p>{t('loading')}</p>
	if (error) return <p>{error}</p>

	return (
		<StyledCatalog onClick={onClick}>
			{cakes.map(cake => (
				<CatalogCard
					key={cake._id}
					img={cake.img}
					description={cake[`description${lang}`]}
					cakeName={cake[`cakeName${lang}`]}
					onClick={() => handleClick(cake._id)}
				/>
			))}
		</StyledCatalog>
	)
}

export default ClassicCakesCatalog
