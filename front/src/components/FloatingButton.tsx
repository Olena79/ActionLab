import React, { useEffect, useState } from 'react'
import { Fab, styled } from '@mui/material'
import ToSeminarsBtn from './auth/ToSeminarsBtn'
import Chat from './Chat'
import ChatIcon from '@mui/icons-material/Chat'

const FloatingButton = () => {
	const [visible, setVisible] = useState(false)
	const [chatOpen, setChatOpen] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(true)
		}, 7000) // 5 секунд
		return () => clearTimeout(timer)
	}, [])

	if (!visible) return null

	return (
		<Wrapper>
			<Fab
				color='secondary'
				aria-label='chat'
				sx={{ position: 'fixed', bottom: 86, right: 16 }}
				onClick={() => {
					setChatOpen(true)
					setTimeout(() => {
						const firstInput =
							document.querySelector<HTMLInputElement>('#chat-input')
						firstInput?.focus()
					}, 0)
				}}
			>
				<ChatIcon />
			</Fab>
			<Chat open={chatOpen} onClose={() => setChatOpen(false)} />
			<ToSeminarsBtn />
		</Wrapper>
	)
}

export default FloatingButton

// ===================== STYLES =====================
const Wrapper = styled('div')(() => ({
	position: 'fixed',
	bottom: 26,
	right: 10,
	zIndex: 9999,
	transition: 'transform 1s ease',
	boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
	borderRadius: '24px',
}))
