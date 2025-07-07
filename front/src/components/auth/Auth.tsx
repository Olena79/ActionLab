import React, { useEffect, useRef, useState } from 'react'
import { styled } from '@mui/system'
import UserIcon from '../../icons/UserIcon'
import { useTranslation } from '../../translation/TranslationContext'
import AuthModal from './AuthModal'
import InfoModal from '../InfoModal'
import { useAuth } from '../../context/AuthContext'

const StyledMenu = styled('div')(() => ({
	display: 'flex',
	gap: 8,
}))

const StyledIcon = styled('button')(() => ({
	color: 'black',
	transition: '0.5s',
	cursor: 'pointer',
	position: 'relative',
	'&:hover': {
		color: 'red',
	},
}))

const StyledShowAuth = styled('div')(() => ({
	position: 'absolute',
	top: 60,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-end',
	minWidth: 100,
	backgroundColor: 'white',
	borderRadius: '50%',
}))

const StyledBtnBlock = styled('button')(() => ({
	width: '100%',
	boxShadow: 'inset rgba(0, 0, 0, 0.35) 0px 2px 5px',
	borderRadius: '50%',
	textAlign: 'center',
	padding: '16px 8px',
	color: 'black',
	transition: '0.5s',
	'&:hover': {
		color: 'red,',
	},
}))

const Auth: React.FC = () => {
	const { t } = useTranslation()
	const { isAuthenticated, logout } = useAuth()

	const [showAuth, setShowAuth] = useState(false)
	const [modalOpen, setModalOpen] = useState(false)
	const [infoModalOpen, setInfoModalOpen] = useState<{
		title: string
		message1: string
		message2: string
	} | null>(null)
	const [infoMessage, setInfoMessage] = useState<{
		title: string
		message1: string
		message2: string
		action?: {
			label: string
			onClick: () => void
		}
	} | null>(null)

	const dropdownRef = useRef<HTMLDivElement>(null)

	const handleShowAuth = () => {
		setShowAuth(prev => !prev)
	}

	// Закриття при кліку поза елементом
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setShowAuth(false)
			}
		}

		if (showAuth) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [showAuth])

	return (
		<>
			<StyledMenu>
				<StyledIcon onClick={handleShowAuth}>
					<UserIcon size={40} />
				</StyledIcon>
				{showAuth && (
					<StyledShowAuth ref={dropdownRef}>
						{isAuthenticated ? (
							<StyledBtnBlock
								onClick={() => {
									setShowAuth(false)
									setInfoModalOpen({
										title: t('auth.logout.title'),
										message1: t('auth.logout.message1'),
										message2: t('auth.logout.message2'),
									})
								}}
							>
								{t('auth.exit')}
							</StyledBtnBlock>
						) : (
							<StyledBtnBlock
								onClick={() => {
									setModalOpen(true)
									setShowAuth(false)
								}}
							>
								{t('auth.enter')}
							</StyledBtnBlock>
						)}
					</StyledShowAuth>
				)}
			</StyledMenu>
			{modalOpen && (
				<AuthModal
					onClose={() => setModalOpen(false)}
					setInfoMessage={setInfoMessage}
				/>
			)}
			{infoMessage && (
				<InfoModal
					title={infoMessage.title}
					message1={infoMessage.message1}
					message2={infoMessage.message2}
					labelOk={t('labelOk')}
					onClose={() => setInfoMessage(null)}
					action={
						infoMessage.action
							? {
									...infoMessage.action,
									onClick: () => {
										setModalOpen(true)
										infoMessage.action!.onClick()
									},
							  }
							: undefined
					}
				/>
			)}

			{infoModalOpen && (
				<InfoModal
					title={infoModalOpen.title}
					message1={infoModalOpen.message1}
					message2={infoModalOpen.message2}
					labelOk={t('auth.logout.doNotExit')}
					onClose={() => setInfoModalOpen(null)}
					action2={{
						label: t('auth.logout.exit'),
						onClick: () => {
							logout()
							setInfoModalOpen(null)
						},
					}}
				/>
			)}
		</>
	)
}

export default Auth
