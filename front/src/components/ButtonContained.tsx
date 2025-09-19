import React from 'react'
import { Button, styled, SxProps, Theme } from '@mui/material'

interface ButtonContainedProps {
	text: string
	pass?: string
	type?: 'button' | 'submit' | 'reset'
	disabled?: boolean
	sx?: SxProps<Theme> | undefined
	onClick?: () => void
}

const ButtonContained: React.FC<ButtonContainedProps> = ({
	text,
	pass,
	type,
	disabled,
	sx,
	onClick,
}) => {
	return (
		<>
			<StyledButton disabled={disabled} type={type} onClick={onClick} sx={sx}>
				<StyledLink href={pass}>{text}</StyledLink>
			</StyledButton>
		</>
	)
}

export default ButtonContained

//======================//=======================//

const StyledButton = styled(Button)(({ theme }) => ({
	width: 'fit-content',
	padding: '10px 16px 6px 16px',
	backgroundColor: theme.palette.secondary.main,
	color: theme.palette.primary.main,
	fontWeight: 600,
	borderRadius: 24,
	cursor: 'pointer',
	transition: '0.5s',
	'&:hover': {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.secondary.main,
	},
	'&:disabled': {
		backgroundColor: theme.palette.secondary.light,
		cursor: 'auto',
	},
}))

const StyledLink = styled('a')(() => ({
	textDecoration: 'none',
	textAlign: 'center',
	color: 'inherit',
}))
