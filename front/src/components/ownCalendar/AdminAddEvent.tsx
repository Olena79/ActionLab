import React, { useState } from 'react'
import { styled } from '@mui/system'
import { createCalendarEvent } from '../../actions/ownCalendarActions'
import { useTranslation } from '../../translation/TranslationContext'

const AdminButton = styled('button')(() => ({
	padding: '6px 20px',
	border: '1px solid black',
	borderRadius: 12,
	width: 'fit-content',
	transition: '0.5s',
	'&:hover': {
		backgroundColor: 'pink',
	},
}))

const Backdrop = styled('div')(() => ({
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100vw',
	height: '100vh',
	background: 'rgba(0,0,0,0.4)',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	zIndex: 1000,
}))

const Modal = styled('div')(() => ({
	background: 'white',
	borderRadius: 16,
	padding: 24,
	width: 400,
	display: 'flex',
	flexDirection: 'column',
	gap: 16,
}))

const Label = styled('label')(() => ({
	display: 'flex',
	flexDirection: 'column',
	fontSize: 14,
	gap: 4,
}))

const Input = styled('input')(() => ({
	padding: 8,
	borderRadius: 8,
	border: '1px solid #ccc',
}))

const Select = styled('select')(() => ({
	padding: 8,
	borderRadius: 8,
	border: '1px solid #ccc',
}))

const TextArea = styled('textarea')(() => ({
	padding: 8,
	borderRadius: 8,
	border: '1px solid #ccc',
	resize: 'vertical',
	minHeight: 80,
}))

const ButtonRow = styled('div')(() => ({
	display: 'flex',
	justifyContent: 'flex-end',
	gap: 8,
	marginTop: 16,
}))

const ModalButton = styled('button')(() => ({
	padding: '8px 16px',
	borderRadius: 8,
	cursor: 'pointer',
	border: 'none',
	backgroundColor: '#eee',
	'&:hover': {
		opacity: 0.8,
	},
}))

interface AdminAddEventProps {
	children: string
	onEventCreated: () => void
}

const AdminAddEvent: React.FC<AdminAddEventProps> = ({
	children,
	onEventCreated,
}) => {
	const { t } = useTranslation()
	const [open, setOpen] = useState(false)
	const [dates, setDates] = useState<string[]>([''])
	const [type, setType] = useState('')
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const handleAddDate = () => {
		setDates(prev => [...prev, ''])
	}

	const handleDateChange = (value: string, index: number) => {
		const updated = [...dates]
		updated[index] = value
		setDates(updated)
	}

	const handleSubmit = async () => {
		if (dates.some(d => !d) || !type || !title)
			return alert('Усі поля обовʼязкові')

		const event = { dates, type, title, description }

		try {
			const response = await createCalendarEvent(event)
			onEventCreated()
			alert('✅ Подію створено')
			console.log('✅ Подію створено:', response)

			// Очистити форму
			setOpen(false)
			setDates([''])
			setType('')
			setTitle('')
			setDescription('')
		} catch (error) {
			console.error('❌ Помилка при створенні події:', error)
			alert('Не вдалося створити подію. Спробуйте ще раз.')
		}
	}

	return (
		<>
			<AdminButton onClick={() => setOpen(true)}>{children}</AdminButton>

			{open && (
				<Backdrop onClick={() => setOpen(false)}>
					<Modal onClick={e => e.stopPropagation()}>
						<h3>{t('ownCalendar.adminAddEvent.addEvent')}</h3>

						{dates.map((d, idx) => (
							<Label key={idx}>
								{t('ownCalendar.adminAddEvent.eventDay')} #{idx + 1}
								<Input
									type='date'
									value={d}
									onChange={e => handleDateChange(e.target.value, idx)}
								/>
							</Label>
						))}

						<ModalButton onClick={handleAddDate}>
							➕ {t('ownCalendar.adminAddEvent.eventDay') || 'Додати дату'}
						</ModalButton>

						<Label>
							{t('ownCalendar.adminAddEvent.eventType')}
							<Select value={type} onChange={e => setType(e.target.value)}>
								<option value=''>
									{t('ownCalendar.adminAddEvent.chooseEvent')}
								</option>
								<option value='training'>
									{t('ownCalendar.adminAddEvent.training')}
								</option>
								<option value='workshop'>
									{t('ownCalendar.adminAddEvent.workshop')}
								</option>
								<option value='holiday'>
									{t('ownCalendar.adminAddEvent.holiday')}
								</option>
							</Select>
						</Label>

						<Label>
							{t('ownCalendar.adminAddEvent.eventName')}
							<Input
								type='text'
								value={title}
								onChange={e => setTitle(e.target.value)}
							/>
						</Label>

						<Label>
							{t('ownCalendar.adminAddEvent.eventDesc')}
							<TextArea
								value={description}
								onChange={e => setDescription(e.target.value)}
							/>
						</Label>

						<ButtonRow>
							<ModalButton onClick={() => setOpen(false)}>
								{t('ownCalendar.adminAddEvent.cancel')}
							</ModalButton>
							<ModalButton
								style={{ backgroundColor: 'pink' }}
								onClick={handleSubmit}
							>
								{t('ownCalendar.adminAddEvent.add')}
							</ModalButton>
						</ButtonRow>
					</Modal>
				</Backdrop>
			)}
		</>
	)
}

export default AdminAddEvent
