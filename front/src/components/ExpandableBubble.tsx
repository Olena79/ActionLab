import React, { useState, useEffect, useRef } from 'react'
import { styled, SxProps, Theme } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Typography } from '@mui/material'
import { RoundVideoPlayer } from './RoundVideoPlayer'

interface BubbleProps {
	phrase: string
	phrase2: string
	phrase3: string
	sx: SxProps<Theme> | undefined
}

export default function ExpandableBubble({
	phrase,
	phrase2,
	phrase3,
	sx,
}: BubbleProps) {
	const [open, setOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement | null>(null)

	const firstWord = phrase.split(/\s+/)[0]

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') setOpen(false)
		}
		if (open) document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [open])

	useEffect(() => {
		function onDocClick() {
			if (open) setOpen(false)
		}
		document.addEventListener('mousedown', onDocClick)
		return () => document.removeEventListener('mousedown', onDocClick)
	}, [open])

	return (
		<Box sx={sx}>
			<AnimatePresence>
				<div style={{ width: 100, height: 100 }}>
					{!open && (
						<motion.div
							key='closed'
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
						>
							<SmallBubble onClick={() => setOpen(true)}>
								<InfoValue>{firstWord}</InfoValue>
							</SmallBubble>
						</motion.div>
					)}
				</div>

				{open && (
					<Overlay
						key='open'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<LargeBubble
							ref={containerRef}
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
						>
							<InfoValue>{phrase}</InfoValue>
							<InfoValue>{phrase2}</InfoValue>
							<InfoValue>{phrase3}</InfoValue>
						</LargeBubble>
					</Overlay>
				)}
			</AnimatePresence>
		</Box>
	)
}

export const BubbleList = () => {
	return (
		<MainBox>
			<Typography variant='h6' sx={{ margin: 4 }}>
				Як проходять заняття
			</Typography>
			<BubbleContainer>
				<RoundVideoPlayer
					src='/media/Training2.mp4'
					poster='/media/Poster1.jpg'
				/>
				<ExpandableBubble
					sx={{
						position: 'absolute',
						left: '35%',
						'@media (max-width: 600px)': { left: '58%', top: '-10%' },
					}}
					phrase='Розминка'
					phrase2='розігрів і підготовка'
					phrase3='(крос-фіт, акробатичні вправи)'
				/>
				<ExpandableBubble
					sx={{
						position: 'absolute',
						left: '50%',
						top: '20%',
						'@media (max-width: 600px)': { left: '70%' },
					}}
					phrase='Техніка'
					phrase2='падіння, стійки, удари —'
					phrase3='робота в парах'
				/>
				<ExpandableBubble
					sx={{
						position: 'absolute',
						left: '65%',
						top: '40%',
						'@media (max-width: 600px)': { left: '68%', top: '50%' },
					}}
					phrase='Вивчення'
					phrase2='частини хореографії —'
					phrase3='по кроках'
				/>
				<ExpandableBubble
					sx={{
						position: 'absolute',
						left: '80%',
						top: '60%',
						'@media (max-width: 600px)': { left: '58%', top: '80%' },
					}}
					phrase='Складання'
					phrase2='вивчених частин бійки та'
					phrase3='відпрацювання таймінгу й емоцій'
				/>
			</BubbleContainer>
		</MainBox>
	)
}

//===============================================
const MainBox = styled(Box)(() => ({
	// backgroundColor: 'white',
	padding: '12px 0',
}))

const BubbleContainer = styled('div')(() => ({
	position: 'relative',
	display: 'flex',
	paddingBottom: 60,
	backgroundImage:
		'url(https://res.cloudinary.com/dsgqhwqr7/image/upload/v1761561377/Fon13_igltgi.png)',
	backgroundSize: 'cover', // Покриває всю область
	backgroundPosition: 'center', // Центрує зображення
	backgroundRepeat: 'no-repeat', // Не повторює зображення
	width: '100%',
	'@media (max-width: 600px)': {
		backgroundImage: 'none',
	},
}))

const SmallBubble = styled('button')(({ theme }) => ({
	width: 150,
	height: 150,
	borderRadius: '50%',
	backgroundColor: '#fff',
	border: 'none',
	cursor: 'pointer',
	boxShadow: 'inset 0px -2px 39px -16px #F5DD47',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: '16px',
	color: theme.palette.primary.main,
	fontWeight: 600,
	transition: 'transform 0.3s ease',
	'&:hover': {
		transform: 'scale(1.05)',
	},
	'@media (max-width: 900px)': {
		width: 100,
		height: 100,
	},
}))

const Overlay = styled(motion.div)(() => ({
	position: 'fixed',
	inset: 0,
	backgroundColor: 'rgba(0,0,0,0.4)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	zIndex: 50,
}))

const LargeBubble = styled(motion.div)(() => ({
	position: 'relative',
	width: 250,
	height: 250,
	borderRadius: '50%',
	backgroundColor: '#fff',
	boxShadow: 'inset 0px -2px 50px 9px #F5DD47',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: 16,
	padding: 24,
	textAlign: 'center',
	flexDirection: 'column',
}))

const InfoValue = styled('span')(() => ({
	fontSize: '16px',
	color: '#2c3e50',
	fontWeight: 600,
}))
