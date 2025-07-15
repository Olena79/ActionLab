import React from 'react'
import CalendarTable from '../components/ownCalendar/CalendarTable'
import { useTranslation } from '../translation/TranslationContext'
import { styled } from '@mui/material'

const StyledTitle = styled('h1')(() => ({
	textAlign: 'center',
	margin: 10,
	fontSize: 40,
	fontWeight: 700,
	color: 'green',
}))

const CalendarPage: React.FC = () => {
	const { t } = useTranslation()
	return (
		<div>
			<StyledTitle>{t('ownCalendar.title')}</StyledTitle>
			<CalendarTable />
		</div>
	)
}

export default CalendarPage
