import React, { useState } from 'react'
import { Box, styled } from '@mui/material'

const modules = [
	{
		title: 'Базова акробатика',
		description: '(перекиди, колесо, стрибки вперед, падіння)',
		fullDescription: [
			'Техніка безпечних перекидів',
			'Стрибкові елементи з правильною амортизацією',
			'Система безпечних падінь та групування',
			'Розвиток координації й просторової орієнтації',
		],
	},
	{
		title: 'Удари руками/ногами',
		description:
			'(включає елементи ушу, вінчун, BJJ, бокс, тайський бокс, крав мага)',
		fullDescription: [
			'Базові удари руками',
			'Техніки ушу: відкрита долоня',
			'Основи вінчун',
			'Удари ногами',
			'Елементи BJJ: контроль дистанції',
			'Прикладні техніки крав мага для самозахисту',
		],
	},
	{
		title: 'Захист & Витривалість',
		description: '(реакції, інтенсив — кросфіт)',
		fullDescription: [
			'Розвиток миттєвих рефлексів та реакції',
			'Кросфіт-тренування для підвищення витривалості',
			'Техніки ухилення та блокування',
			'Робота з дистанцією та таймінгом',
		],
	},
	{
		title: 'Робота з холодною зброєю',
		description: '(палки, пістолети-імітації, мечі/ножі)',
		fullDescription: [
			'Палиці: базові блоки, удари, хвати',
			'Пістолети: правильна стійка, цілення, тактичні переміщення',
			'Мечі/ножі: основні різи, захисні позиції',
			'Комбінації рукопашного бою зі зброєю',
		],
	},
	{
		title: 'Імітація реального бою та стрес-тест',
		fullDescription: [
			'Робота під тиском часу та в умовах втоми',
			'Психологічна стійкість: робота з адреналіном та реакціями',
		],
	},
]

const ModulesSectionElem: React.FC = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const handleClick = (idx: number) => {
		setOpenIndex(openIndex === idx ? null : idx)
	}

	return (
		<Box>
			{modules.map((module, idx) => (
				<Box key={idx}>
					<ModuleItem onClick={() => handleClick(idx)}>
						<ModuleNumber>{idx + 1}</ModuleNumber>
						<ModuleContent>
							<ModuleTitle>{module.title}</ModuleTitle>
							<ModuleDesc>{module.description}</ModuleDesc>
							<ArrowDown
								src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1759073660/arrowDown_yngbu5.svg'
								alt='Arrow Down'
								width={12}
								height={12}
							/>
						</ModuleContent>
					</ModuleItem>

					{openIndex === idx && module.fullDescription && (
						<FullDescriptionBox>
							<ul>
								{module.fullDescription.map((text, i) => (
									<li key={i}>{text}</li>
								))}
							</ul>
						</FullDescriptionBox>
					)}
				</Box>
			))}
		</Box>
	)
}

export default ModulesSectionElem

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

const ModuleTitle = styled('h4')(() => ({
	fontSize: '16px',
	fontWeight: 600,
	color: '#2c3e50',
	margin: 0,
}))

const ModuleDesc = styled('p')(() => ({
	fontSize: '14px',
	color: '#6c757d',
	margin: 0,
	lineHeight: 1.4,
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
