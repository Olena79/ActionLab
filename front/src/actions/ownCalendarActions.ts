import api from './api'

// Тип події
export interface CalendarEventInput {
	dates: string[] // формат: '2025-07-11'
	type: string // тип події (наприклад: "тренування", "змагання", тощо)
	title: string
	description: string
}

export interface CalendarEventProps {
	_id?: string
	id: string
	dates: string[]
	type: string
	title: string
	description?: string
	userId: string
}

export const createCalendarEvent = async (eventData: CalendarEventInput) => {
	const response = await api.post('/ownCalendar/own-calendar', eventData)
	return response.data
}

export const fetchOwnCalendarEvents = async (): Promise<
	CalendarEventProps[]
> => {
	try {
		const response = await api.get('/ownCalendar/own-calendar')
		return response.data.events
	} catch (error) {
		console.error('❌ Failed to fetch calendar events:', error)
		throw error
	}
}
