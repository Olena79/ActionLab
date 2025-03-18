import React from 'react'
import { styled } from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

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

interface IngridientCardProps {
	variations: { [key: string]: any }[]
	lang: 'UA' | 'EN'
	onClick: (value: string) => void
}

export const IngredientCard: React.FC<IngridientCardProps> = ({
	variations,
	lang,
	onClick,
}) => {
	return (
		<StyledUl>
			{variations?.length > 0 &&
				variations.map(variant => (
					<StyledLi
						key={variant._id || variant.name}
						onClick={() => onClick(variant.variation)}
					>
						<ArrowRightIcon /> {variant.variation || '❌ Немає даних'}
					</StyledLi>
				))}
		</StyledUl>
	)
}
