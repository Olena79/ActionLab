import React, { useEffect, useRef, useState } from 'react'
import { styled } from '@mui/system'
import UserIcon from '../../icons/UserIcon'
import { useTranslation } from '../../translation/TranslationContext'
import AuthModal from './AuthModal'
import InfoModal from '../InfoModal'

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
	top: 70,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-end',
	minWidth: 100,
	borderRadius: 8,
	backgroundColor: 'white',
}))

const StyledBtnBlock = styled('button')(() => ({
	width: '100%',
	boxShadow: 'inset rgba(0, 0, 0, 0.35) 0px 2px 5px',
	borderRadius: 4,
	textAlign: 'end',
	padding: '4px 8px',
	color: 'black',
	transition: '0.5s',
	'&:hover': {
		color: 'red,',
	},
}))

const Auth: React.FC = () => {
	const { t } = useTranslation()
	const [showAuth, setShowAuth] = useState(false)
	const [modalOpen, setModalOpen] = useState(false)
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
						<StyledBtnBlock onClick={() => setModalOpen(true)}>
							{t('auth.enter')}
						</StyledBtnBlock>
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
		</>
	)
}

export default Auth
