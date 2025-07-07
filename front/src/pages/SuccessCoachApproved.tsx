import { styled } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const StyledContainer = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	gap: 20,
})

const StyledTitle = styled('h1')({
	fontSize: 24,
	fontWeight: 700,
})

const StyledDesc = styled('p')({
	color: 'green',
})

const RejectCoach: React.FC = () => {
	return (
		<StyledContainer>
			<StyledTitle>🎉 Тренера підтверджено!</StyledTitle>
			<StyledDesc>
				Користувач може тепер увійти у систему як тренер. Йому було надіслано
				листа з підтвердженням
			</StyledDesc>
			<Link to='/'>Повернутися на головну</Link>
		</StyledContainer>
	)
}

export default RejectCoach
