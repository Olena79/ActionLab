// src/components/auth/AuthModal.tsx
import React, { useState } from 'react'
import { styled } from '@mui/system'
import AuthFormLogin from './AuthFormLogin'
import AuthFormRegister from './AuthFormRegister'
import { useTranslation } from '../../translation/TranslationContext'

const ModalOverlay = styled('div')({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: 'rgba(0,0,0,0.4)',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	zIndex: 1000,
})

const ModalContent = styled('div')({
	backgroundColor: '#fff',
	padding: '24px',
	borderRadius: 8,
	width: '90%',
	maxWidth: 400,
})

const TabHeader = styled('div')({
	display: 'flex',
	justifyContent: 'space-between',
	marginBottom: 16,
})

const TabButton = styled('button')<{ active: boolean }>(({ active }) => ({
	flex: 1,
	padding: 8,
	fontWeight: active ? 600 : 400,
	borderBottom: active ? '2px solid red' : '2px solid transparent',
	cursor: 'pointer',
	background: 'none',
}))

interface AuthModalProps {
	onClose: () => void
	setInfoMessage: (msg: {
		title: string
		message1: string
		message2: string
	}) => void
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, setInfoMessage }) => {
	const [tab, setTab] = useState<'login' | 'register'>('login')
	const { t } = useTranslation()

	return (
		<ModalOverlay onClick={onClose}>
			<ModalContent onClick={e => e.stopPropagation()}>
				<TabHeader>
					<TabButton active={tab === 'login'} onClick={() => setTab('login')}>
						{t('auth.enter')}
					</TabButton>
					<TabButton
						active={tab === 'register'}
						onClick={() => setTab('register')}
					>
						{t('auth.registerTitle')}
					</TabButton>
				</TabHeader>
				{tab === 'login' ? (
					<AuthFormLogin />
				) : (
					<AuthFormRegister
						onSuccess={msg => {
							onClose()
							setInfoMessage(msg)
						}}
					/>
				)}
			</ModalContent>
		</ModalOverlay>
	)
}

export default AuthModal
