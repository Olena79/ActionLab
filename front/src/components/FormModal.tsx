import React, { useEffect, useRef } from 'react'
import { styled } from '@mui/system'

const StyledModalButtonOwnRecipes = styled('div')(() => ({
	textTransform: 'none',
	position: 'absolute',
	zIndex: 1,
	backgroundColor: 'white',
	border: '1px solid black',
	padding: 12,
	borderRadius: 12,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	minHeight: 800,
	maxHeight: 1000,
	overflowY: 'auto',
	cursor: 'auto',

	top: 90,
	left: 55,
	width: 585,

	// Стилізація скролбара
	'&::-webkit-scrollbar': {
		width: '8px', // Ширина скролбара
	},
	'&::-webkit-scrollbar-track': {
		background: '#f1f1f1', // Колір фону
		borderRadius: '10px',
	},
	'&::-webkit-scrollbar-thumb': {
		background: '#888', // Колір скролу
		borderRadius: '10px',
	},
	'&::-webkit-scrollbar-thumb:hover': {
		background: '#555', // Колір при наведенні
	},
}))

interface FormModalProps {
	children: any
}

export const ModalButtonOwnRecipes: React.FC<FormModalProps> = ({
	children,
}) => {
	return <StyledModalButtonOwnRecipes>{children}</StyledModalButtonOwnRecipes>
}

//=======================================================

const StyledModalButtonClassicRecipes = styled('div')(() => ({
	textTransform: 'none',
	position: 'absolute',
	zIndex: 1,
	backgroundColor: 'white',
	border: '1px solid black',
	padding: 12,
	borderRadius: 12,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	maxHeight: 600,
	overflowY: 'auto',
	cursor: 'auto',

	top: 90,
	width: 585,

	// Стилізація скролбара
	'&::-webkit-scrollbar': {
		width: '8px', // Ширина скролбара
	},
	'&::-webkit-scrollbar-track': {
		background: '#f1f1f1', // Колір фону
		borderRadius: '10px',
	},
	'&::-webkit-scrollbar-thumb': {
		background: '#888', // Колір скролу
		borderRadius: '10px',
	},
	'&::-webkit-scrollbar-thumb:hover': {
		background: '#555', // Колір при наведенні
	},
}))

interface FormModalProps {
	children: any
}

export const ModalButtonClassicRecipes: React.FC<FormModalProps> = ({
	children,
}) => {
	return (
		<StyledModalButtonClassicRecipes>
			{children}
		</StyledModalButtonClassicRecipes>
	)
}

//=======================================================

const StyledModalIngredient = styled('div')(() => ({
	textTransform: 'none',
	position: 'absolute',
	zIndex: 1,
	backgroundColor: 'white',
	border: '1px solid black',
	padding: 12,
	borderRadius: 12,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	maxHeight: 600,
	overflowY: 'auto',
	cursor: 'auto',

	top: 60,
	left: 300,
	width: 270,

	// Стилізація скролбара
	'&::-webkit-scrollbar': {
		width: '8px', // Ширина скролбара
	},
	'&::-webkit-scrollbar-track': {
		background: '#f1f1f1', // Колір фону
		borderRadius: '10px',
	},
	'&::-webkit-scrollbar-thumb': {
		background: '#888', // Колір скролу
		borderRadius: '10px',
	},
	'&::-webkit-scrollbar-thumb:hover': {
		background: '#555', // Колір при наведенні
	},
}))

interface FormModalIngredientProps {
	// isOpen: boolean
	// onClose: () => void
	children: any
}

export const ModalIngredient: React.FC<FormModalIngredientProps> = ({
	children,
	// isOpen,
	// onClose,
}) => {
	// const modalRef = useRef<HTMLDivElement>(null)

	// useEffect(() => {
	// 	const handleOutsideClick = (event: MouseEvent) => {
	// 		if (
	// 			modalRef.current &&
	// 			!modalRef.current.contains(event.target as Node)
	// 		) {
	// 			onClose()
	// 		}
	// 	}
	// 	if (isOpen) {
	// 		document.addEventListener('mousedown', handleOutsideClick)
	// 	}

	// 	return () => {
	// 		document.removeEventListener('mousedown', handleOutsideClick)
	// 	}
	// }, [isOpen, onClose])

	return <StyledModalIngredient>{children}</StyledModalIngredient>
	// ref={modalRef}
}

//=======================================================

const StyledModalFlavors = styled('div')(() => ({
	textTransform: 'none',
	position: 'absolute',
	zIndex: 1,
	backgroundColor: 'white',
	border: '1px solid black',
	padding: 12,
	borderRadius: 12,
	display: 'flex',
	flexDirection: 'column',
	gap: 12,
	maxHeight: 600,
	overflowY: 'auto',
	cursor: 'auto',

	// top: 130,
	width: 250,

	// Стилізація скролбара
	'&::-webkit-scrollbar': {
		width: '8px', // Ширина скролбара
	},
	'&::-webkit-scrollbar-track': {
		background: '#f1f1f1', // Колір фону
		borderRadius: '10px',
	},
	'&::-webkit-scrollbar-thumb': {
		background: '#888', // Колір скролу
		borderRadius: '10px',
	},
	'&::-webkit-scrollbar-thumb:hover': {
		background: '#555', // Колір при наведенні
	},
}))

interface FormModalFlavorsProps {
	// isOpen: boolean
	// onClose: () => void
	children: any
}

export const ModalFlavors: React.FC<FormModalFlavorsProps> = ({
	// isOpen,
	// onClose,
	children,
}) => {
	// const modalRef = useRef<HTMLDivElement>(null)

	// useEffect(() => {
	// 	const handleOutsideClick = (event: MouseEvent) => {
	// 		if (
	// 			modalRef.current &&
	// 			!modalRef.current.contains(event.target as Node)
	// 		) {
	// 			onClose()
	// 		}
	// 	}
	// 	if (isOpen) {
	// 		document.addEventListener('mousedown', handleOutsideClick)
	// 	}

	// 	return () => {
	// 		document.removeEventListener('mousedown', handleOutsideClick)
	// 	}
	// }, [isOpen, onClose])

	return <StyledModalFlavors>{children}</StyledModalFlavors>
} //  ref={modalRef}
