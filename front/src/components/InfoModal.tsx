import React from 'react'
import { styled } from '@mui/system'

const Overlay = styled('div')(() => ({
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100vw',
	height: '100vh',
	background: 'rgba(0, 0, 0, 0.5)',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	zIndex: 999,
}))

const ModalBox = styled('div')(() => ({
	background: 'white',
	padding: '2rem',
	borderRadius: 8,
	maxWidth: 400,
	width: '100%',
	textAlign: 'center',
	boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
	display: 'flex',
	flexDirection: 'column',
	gap: 30,
}))

const StyledTitle = styled('h1')(() => ({
	fontSize: 26,
	fontWeight: 700,
}))

const StyledBtnBox = styled('div')(() => ({
	display: 'flex',
	justifyContent: 'center',
}))

const StyledButton = styled('button')(() => ({
	backgroundColor: 'grey',
	color: 'black',
	padding: '4px 32px',
	width: 'fit-content',
	borderRadius: 4,
	transition: '0.5s',
	'&:hover': {
		backgroundColor: 'black',
		color: 'white',
	},
}))

const StyledLink = styled('button')(() => ({
	color: 'blue',
	textDecoration: 'underline',
	transition: '0.5s',
	'&:hover': {
		color: 'green',
	},
}))

interface InfoModalProps {
	message1: string
	message2: string
	title: string
	onClose: () => void
	action?: {
		label: string
		onClick: () => void
	}
}

const InfoModal: React.FC<InfoModalProps> = ({
	message1,
	message2,
	title,
	onClose,
	action,
}) => {
	return (
		<Overlay onClick={onClose}>
			<ModalBox onClick={(e: React.MouseEvent) => e.stopPropagation()}>
				<StyledTitle>{title}</StyledTitle>
				<p>{message1}</p>
				<p>{message2}</p>
				{action && (
					<StyledLink
						onClick={() => {
							onClose()
							action.onClick()
						}}
					>
						{action.label}
					</StyledLink>
				)}
				<StyledBtnBox>
					<StyledButton onClick={onClose}>OK</StyledButton>
				</StyledBtnBox>
			</ModalBox>
		</Overlay>
	)
}

export default InfoModal
