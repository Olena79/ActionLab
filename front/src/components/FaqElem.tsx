import React, { useState } from 'react'
import { Box, styled } from '@mui/material'

const faq = [
	{
		question: 'Чи підходять заняття для початківців?',
		answer:
			'Так — ми починаємо з базової техніки і далі поступово ускладнюємо вправи в залежності від групи.',
	},
	{
		question: 'Чи потрібно мати спортивну підготовку?',
		answer:
			'Базова фізична форма допомагає, але ми навчаємо від початкових кроків.',
	},
	{
		question: 'Чи безпечно займатися акробатикою й падіннями?',
		answer:
			'Так — безпека пріоритет: ми працюємо з прогресією, контролем групи і правильними техніками амортизації.',
	},
	{
		question: 'Чи можна знімати відео під час демонстрацій?',
		answer: 'Так, за згодою. Найкращі відео ми публікуємо в нашому Instagram.',
	},
	{
		question: 'Чи потрібно мати свій реквізит/зброю?',
		answer:
			'Ні — усе необхідне на заняттях надаємо. Якщо у вас є власний реквізит, повідомте тренера.',
	},
]

const FaqElem: React.FC = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const handleClick = (idx: number) => {
		setOpenIndex(openIndex === idx ? null : idx)
	}

	return (
		<Box sx={{ mt: 2 }}>
			{faq.map((f, idx) => (
				<Box key={idx}>
					<ModuleItem onClick={() => handleClick(idx)}>
						<ModuleNumber>{idx + 1}</ModuleNumber>
						<ModuleContent>
							<ModuleTitle>{f.question}</ModuleTitle>
							<ArrowDown
								src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759073660/arrowDown_yngbu5.svg'
								alt='Arrow Down'
								width={12}
								height={12}
							/>
						</ModuleContent>
					</ModuleItem>

					{openIndex === idx && f.answer && (
						<FullDescriptionBox>
							<span>{f.answer}</span>
						</FullDescriptionBox>
					)}
				</Box>
			))}
		</Box>
	)
}

export default FaqElem

// === styled components ===
const ModuleItem = styled(Box)(() => ({
	display: 'flex',
	gap: '16px',
	padding: '16px',
	backgroundColor: '#ffffff',
	border: '1px solid #e9ecef',
	borderRadius: '8px',
	transition: 'all 0.2s ease',

	'&:hover': {
		boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
		transform: 'translateY(-1px)',
	},
}))

const ModuleNumber = styled('div')(() => ({
	width: '32px',
	height: '32px',
	backgroundColor: '#6c757d',
	color: 'white',
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: '14px',
	fontWeight: 600,
	flexShrink: 0,
}))

const ModuleContent = styled(Box)(() => ({
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
	position: 'relative',
}))

const ModuleTitle = styled('span')(() => ({
	fontSize: '16px',
	fontWeight: 600,
	color: '#2c3e50',
	margin: 0,
}))

const FullDescriptionBox = styled(Box)(() => ({
	marginTop: '8px',
	padding: '12px 16px',
	backgroundColor: '#f8f9fa',
	borderRadius: '8px',
	border: '1px solid #dee2e6',
	ul: {
		margin: 0,
		paddingLeft: '20px',
	},
	li: {
		fontSize: '14px',
		color: '#495057',
		marginBottom: '6px',
	},
}))

const ArrowDown = styled('img')(({ theme }) => ({
	color: theme.palette.primary.main,
	position: 'absolute',
	right: 5,
	bottom: '-8px',
}))
