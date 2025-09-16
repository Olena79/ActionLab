import { Box, styled } from '@mui/material'
import NoIcon from './NoIcon'
import YesIcon from './YesIcon'

const NoBox = styled(Box)(({ theme }) => ({
	color: theme.palette.error.main,
}))
const YesBox = styled(Box)(({ theme }) => ({
	color: theme.palette.success.main,
}))

export const No = () => {
	return (
		<NoBox>
			<NoIcon />
		</NoBox>
	)
}

export const Yes = () => {
	return (
		<YesBox>
			<YesIcon />
		</YesBox>
	)
}
