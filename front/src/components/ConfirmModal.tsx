import React, { useEffect, useRef, useState } from 'react'
import { Box, Typography, Modal, styled } from '@mui/material'
import ButtonOutlined from './ButtonOutlined'
import { useTranslation } from '../translation/TranslationContext'
import ButtonContained from './ButtonContained'
import { sendPaymentEmail } from '../actions/monobank'
import { createInvoice } from '../actions/monobank'

export interface ConfirmationModalProps {
	open: boolean
	title: string
	message1: string
	message2: string
	onClose: () => void
	showPayButton?: boolean // показати кнопку "Сплатити"

	userData?: {
		_id?: string
		firstName: string
		lastName: string
		phone: string
		email: string
	}
	seminarData?: {
		_id?: string
		title: string
		date: string
	}
	userId?: string
}

const ConfirmModal: React.FC<ConfirmationModalProps> = ({
	open,
	title,
	message1,
	message2,
	onClose,
	showPayButton = false,
	userData,
	seminarData,
	userId,
}) => {
	const { t } = useTranslation()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null)
	const [paymentId, setPaymentId] = useState<string | null>(null)

	const creatingRef = useRef(false)
	// Створюємо інвойс при відкритті модалки
	useEffect(() => {
		if (!open || !showPayButton) return

		if (!userId || !seminarData?._id || !seminarData?.date) {
			console.warn('⚠️ userId або seminarId ще не доступні, чекаємо...')
			return
		}

		const fetchInvoice = async () => {
			if (creatingRef.current) return

			creatingRef.current = true
			setLoading(true)
			setError(null)

			try {
				console.log('🔹 Створення інвойсу для:', {
					userId,
					seminarId: seminarData._id,
					seminarDate: seminarData.date,
				})
				const response = await createInvoice({
					userId,
					seminarId: seminarData._id!,
					seminarDate: seminarData.date,
					amount: 400000,
					currency: 'UAH',
				})

				if (response.success && response.invoiceUrl) {
					setInvoiceUrl(response.invoiceUrl)
					setPaymentId(response.paymentId || null)
					console.log('✅ Інвойс створено:', {
						invoiceId: response.invoiceId,
						paymentId: response.paymentId,
					})
				} else {
					console.error('❌ Не вдалося створити інвойс:', response.message)
					setError('Помилка при створенні платежу. Спробуйте пізніше.')
				}
			} catch (err) {
				console.error('Помилка при створенні інвойсу:', err)
				setError('Помилка при створенні платежу. Спробуйте пізніше.')
			} finally {
				setLoading(false)
				creatingRef.current = false
			}
		}

		// запускаємо тільки коли всі дані присутні
		fetchInvoice()
	}, [open, showPayButton, userId, seminarData?._id, seminarData?.date])

	const handlePayLater = async () => {
		try {
			if (userData && seminarData && invoiceUrl) {
				console.log(
					'Передача юзера, семінара і invoiceUrl з модалки: ',
					userData,
					seminarData,
					invoiceUrl
				)
				await sendPaymentEmail({ userData, seminarData, invoiceUrl })
				console.log('✅ Лист надіслано')
			}
		} catch (err) {
			console.error('❌ Помилка при відправці листа:', err)
		} finally {
			onClose()
		}
	}

	const handlePayNow = async () => {
		if (!invoiceUrl) {
			alert('❌ Посилання на оплату не створено. Зверніться до підтримки')
			return
		}
		console.log('🔗 Перехід на оплату:', invoiceUrl)

		// Зберігаємо paymentId для перевірки статусу після повернення
		if (paymentId) {
			localStorage.setItem('lastPaymentId', paymentId)
		}

		window.location.href = invoiceUrl
		onClose()
	}

	return (
		<Modal
			open={open}
			onClose={(event, reason) => {
				if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
					return // ігноруємо закриття кліком поза модалкою або Esc
				}
				onClose()
			}}
		>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 400,
					bgcolor: 'background.default',
					backgroundImage:
						'url(https://res.cloudinary.com/dsgqhwqr7/image/upload/v1757845572/360M_sgamb6.jpg)',
					backgroundSize: 'contain', // Покриває всю область
					backgroundPosition: 'start', // Центрує зображення
					backgroundRepeat: 'no-repeat', // Не повторює зображення
					boxShadow: 24,
					p: 4,
					borderRadius: 2,
					textAlign: 'center',
				}}
			>
				{!showPayButton && (
					<CloseButton type='button' onClick={() => onClose?.()}>
						×
					</CloseButton>
				)}

				<Typography variant='h6' mb={2}>
					{title}
				</Typography>
				<Typography mb={1}>{message1}</Typography>
				<Typography mb={3}>{message2}</Typography>

				<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
					{!showPayButton && <ButtonOutlined text='Ok' onClick={onClose} />}
					{showPayButton && (
						<>
							<ButtonOutlined
								text={t('payment.payLaterBtn')}
								onClick={handlePayLater}
							/>

							<ButtonContained
								text={t('payment.payBtn')}
								onClick={handlePayNow}
								disabled={loading || !invoiceUrl || !!error}
							/>
						</>
					)}
				</Box>
			</Box>
		</Modal>
	)
}

export default ConfirmModal

//==================================================

const CloseButton = styled('button')(({ theme }) => ({
	position: 'absolute',
	top: 10,
	right: 8,
	background: 'transparent',
	border: 'none',
	fontSize: '1.2rem',
	cursor: 'pointer',
	padding: '2px 10px 5px 10px',
	borderRadius: 12,
	transition: '0.5s',
	'&:hover': {
		backgroundColor: theme.palette.primary.light,
	},
}))
