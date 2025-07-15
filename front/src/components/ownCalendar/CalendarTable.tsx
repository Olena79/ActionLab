import React, { useMemo, useEffect, useState } from 'react'
import { styled } from '@mui/system'
import { useTranslation } from '../../translation/TranslationContext'
import {
	fetchOwnCalendarEvents,
	CalendarEventProps,
} from '../../actions/ownCalendarActions'
import {
	format,
	addMonths,
	startOfToday,
	endOfMonth,
	getDay,
	isSameMonth,
	Locale,
	isSameDay,
} from 'date-fns'
import { uk, enUS } from 'date-fns/locale'
import { useAuth } from '../../context/AuthContext'
import AdminAddEvent from './AdminAddEvent'

const CalendarWrapper = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	padding: 20,
	gap: 40,
}))

const MonthSection = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
}))

const MonthTitle = styled('h3')(() => ({
	textAlign: 'center',
	marginBottom: 30,
	fontSize: 24,
	borderBottom: '1px solid black',
}))

const Grid = styled('div')(() => ({
	display: 'grid',
	gridTemplateColumns: 'repeat(7, 1fr)',
	gap: 8,
}))

const DayLabel = styled('div')(() => ({
	textAlign: 'center',
	fontWeight: 'bold',
}))

const DayButton = styled('button')(() => ({
	minHeight: 80,
	minWidth: 80,
	border: '1px solid #ccc',
	borderRadius: 8,
	background: 'white',
	cursor: 'pointer',
	position: 'relative',
	transition: '0.5s',
	'&:disabled': {
		backgroundColor: '#f0f0f0',
		color: '#999',
		cursor: 'not-allowed',
	},
	'&.today': {
		border: '2px solid #2196f3',
		backgroundColor: '#e3f2fd',
		fontWeight: 'bold',
	},
	'&.has-event': {
		backgroundColor: '#ffe0ed',
		border: '1px solid #ff7ab8',
	},
	'&:hover': {
		backgroundColor: '#999',
	},
}))

const AdminButtonBlock = styled('div')(() => ({
	display: 'flex',
	justifyContent: 'flex-end',
}))

const EventsBlock = styled('div')(() => ({
	marginTop: 4,
	display: 'flex',
	flexWrap: 'wrap',
	gap: 2,
	justifyContent: 'center',
}))

const EventInfo = styled('div')(() => ({
	marginTop: 4,
	fontSize: '0.7rem',
	color: '#b1004d',
	textAlign: 'center',
}))

const CalendarTable: React.FC = () => {
	const { lang, t } = useTranslation()
	const { user } = useAuth()
	const localeMap: Record<string, Locale> = {
		ua: uk,
		en: enUS,
	}
	const dfnsLocale = localeMap[lang] || enUS
	const [events, setEvents] = useState<CalendarEventProps[]>([])
	const [reloadFlag, setReloadFlag] = useState(false)

	useEffect(() => {
		const loadEvents = async () => {
			try {
				const data = await fetchOwnCalendarEvents()
				setEvents(data)
			} catch (err) {
				console.error('❌ Error loading events:', err)
			}
		}
		loadEvents()
	}, [reloadFlag])

	const today = startOfToday()
	const months = useMemo(() => {
		const result = []
		for (let i = 0; i < 4; i++) {
			const firstDay = addMonths(today, i)
			result.push(firstDay)
		}
		return result
	}, [today])

	const getMonthDays = (date: Date) => {
		const days: (Date | null)[] = []
		const start = new Date(date.getFullYear(), date.getMonth(), 1)
		const end = endOfMonth(start)

		let startWeekday = getDay(start)
		if (startWeekday === 0) startWeekday = 7 // Неділя -> 7

		for (let i = 1; i < startWeekday; i++) days.push(null)

		for (let d = 1; d <= end.getDate(); d++) {
			days.push(new Date(date.getFullYear(), date.getMonth(), d))
		}

		return days
	}

	const weekDays = [
		t('ownCalendar.days.mon'),
		t('ownCalendar.days.tue'),
		t('ownCalendar.days.wed'),
		t('ownCalendar.days.thu'),
		t('ownCalendar.days.fri'),
		t('ownCalendar.days.sat'),
		t('ownCalendar.days.sun'),
	]

	return (
		<CalendarWrapper>
			{user?.role === 'admin' && (
				<AdminButtonBlock>
					<AdminAddEvent onEventCreated={() => setReloadFlag(prev => !prev)}>
						{t('ownCalendar.adminAddEvent.addEvent')}
					</AdminAddEvent>
				</AdminButtonBlock>
			)}
			{months.map((month, index) => {
				const monthDays = getMonthDays(month)

				return (
					<MonthSection key={index}>
						<MonthTitle>
							{format(month, 'LLLL yyyy', { locale: dfnsLocale })}
						</MonthTitle>
						<Grid>
							{weekDays.map((d, i) => (
								<DayLabel key={i}>{d}</DayLabel>
							))}
							{monthDays.map((day, idx) => {
								const isDisabled =
									!day || !isSameMonth(day, month) || day < today
								const isToday = day && isSameDay(day, today)
								// знайдемо події на цей день
								const dayEvents = events.filter(
									ev => day && ev.dates?.includes(format(day, 'yyyy-MM-dd'))
								)

								return (
									<DayButton
										key={idx}
										disabled={isDisabled}
										className={`
											${isToday ? 'today' : ''}
											${dayEvents.length > 0 ? 'has-event' : ''}
										`}
									>
										{day ? format(day, 'd') : ''}
										{dayEvents.length > 0 && (
											<EventsBlock>
												{dayEvents.map(ev => (
													<EventInfo key={ev._id || ev.id}>
														<strong>{ev.type}</strong> <br></br> {ev.title}
													</EventInfo>
												))}
											</EventsBlock>
										)}
									</DayButton>
								)
							})}
						</Grid>
					</MonthSection>
				)
			})}
		</CalendarWrapper>
	)
}

export default CalendarTable
