import React from 'react'
import { styled } from '@mui/system'

interface InfoModalProps {
	message1: string
	message2: string
	title: string
	onClose: () => void
}

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
}))

const InfoModal: React.FC<InfoModalProps> = ({
	message1,
	message2,
	title,
	onClose,
}) => {
	return (
		<Overlay onClick={onClose}>
			<ModalBox onClick={(e: any) => e.stopPropagation()}>
				<h1>{title}</h1>
				<p>{message1}</p>
				<p>{message2}</p>
				<button onClick={onClose}>OK</button>
			</ModalBox>
		</Overlay>
	)
}

export default InfoModal
