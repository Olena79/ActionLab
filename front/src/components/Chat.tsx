import React, { useEffect, useState, useRef } from 'react'
import {
	Dialog,
	DialogContent,
	Typography,
	TextField,
	Box,
} from '@mui/material'
import { motion } from 'framer-motion'
import { sendChatMessage } from '../actions/chat'
import { useTranslation } from '../translation/TranslationContext'
import ButtonContained from './ButtonContained'

interface ChatDialogProps {
	open: boolean
	onClose: () => void
}

interface ChatMessage {
	role: 'user' | 'bot'
	text: string
}

const ChatDialog: React.FC<ChatDialogProps> = ({ open, onClose }) => {
	const { t } = useTranslation()
	const [messages, setMessages] = useState<ChatMessage[]>([])
	const [input, setInput] = useState('')
	const [typing, setTyping] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (open) {
			setTyping(true)
			setTimeout(() => {
				setMessages([{ role: 'bot', text: t('chat.welcome') }])
				setTyping(false)
			}, 1500)
		} else {
			setMessages([])
			setInput('')
			setTyping(false)
		}
	}, [open, t])

	// Прокрутка вниз після кожного оновлення messages
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages, typing])

	const handleSend = async () => {
		if (!input.trim()) return

		const userMessage: ChatMessage = { role: 'user', text: input }
		setMessages(prev => [...prev, userMessage])
		setInput('')
		setTyping(true)
		setIsLoading(true)

		let botMessage: ChatMessage = { role: 'bot', text: '' }
		setMessages(prev => [...prev, botMessage])

		try {
			await sendChatMessage(messages, input, chunk => {
				botMessage = { ...botMessage, text: botMessage.text + chunk }
				setMessages(prev => {
					const updated = [...prev]
					updated[updated.length - 1] = botMessage
					return updated
				})
			})
		} catch (err) {
			setMessages(prev => {
				const updated = [...prev]
				updated[updated.length - 1] = { role: 'bot', text: t('chat.error') }
				return updated
			})
		}

		setTyping(false)
		setIsLoading(false)
	}

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogContent
				sx={{
					border: '1px solid #F5DD47',
					padding: 2,
					margin: 1,
					borderRadius: 4,
					maxWidth: 300,
					backgroundColor: 'white',
				}}
			>
				<Box sx={{ minHeight: 200, mb: 2, overflowY: 'auto', maxHeight: 400 }}>
					{messages.map((msg, index) => (
						<Typography
							key={index}
							sx={{
								mb: 1,
								fontWeight: msg.role === 'user' ? 'bold' : 'normal',
								color: msg.role === 'user' ? 'primary.main' : 'text.primary',
							}}
						>
							{msg.role === 'user' ? 'Ви: ' : 'Бот: '}
							{msg.text}
						</Typography>
					))}
					{typing && (
						<motion.span
							animate={{ opacity: [0, 1, 0] }}
							transition={{ repeat: Infinity, duration: 1 }}
						>
							{t('chat.typing')}
						</motion.span>
					)}
					<div ref={messagesEndRef} /> {/* <-- точка прокрутки */}
				</Box>
				<TextField
					sx={{ mb: 1, color: '#6C6D6F' }}
					value={input}
					onChange={e => setInput(e.target.value)}
					fullWidth
					label={t('chat.message')}
					disabled={isLoading}
					onKeyDown={e => e.key === 'Enter' && handleSend()}
				/>
				<ButtonContained
					text={t('chat.send')}
					onClick={handleSend}
					disabled={isLoading}
				/>
			</DialogContent>
		</Dialog>
	)
}

export default ChatDialog
