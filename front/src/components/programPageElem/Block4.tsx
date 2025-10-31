import React from 'react'
import { Box, styled, Typography } from '@mui/material'
import FaqElem from '../FaqElem'

const Block4: React.FC = () => {
	return (
		<Container>
			<Typography sx={{ mt: 2, mb: 2 }}>
				<Faq>FAQ ...</Faq> <Title>Поширені питання</Title>
			</Typography>
			<FaqElem />
		</Container>
	)
}

export default Block4
//==========================
const Container = styled(Box)(({ theme }) => ({
	marginTop: 30,
	padding: 6,
	width: '100%',
	borderTop: '2px solid #f0f0f0',
}))

const Faq = styled('span')(({ theme }) => ({
	fontSize: 20,
	fontWeight: 700,
	color: theme.palette.secondary.main,
}))

const Title = styled('span')(({ theme }) => ({
	fontSize: 20,
	fontWeight: 700,
	color: theme.palette.primary.main,
}))
