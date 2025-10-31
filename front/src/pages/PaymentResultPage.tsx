import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getPaymentStatus } from '../actions/monobank'
import { styled } from '@mui/material/styles'
import ButtonContained from '../components/ButtonContained'
import ButtonOutlined from '../components/ButtonOutlined'
/**
 * Компонент для відображення результату оплати
 * Користувач потрапляє сюди після оплати через Monobank
 */
const PaymentResultPage: React.FC = () => {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const paymentId = searchParams.get('paymentId')

	const [status, setStatus] = useState<string>('loading')
	const [paymentData, setPaymentData] = useState<any>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const checkPaymentStatus = async () => {
			const localId = localStorage.getItem('lastPaymentId') || paymentId

			if (!localId) {
				setError('Не знайдено інформацію про платіж')
				setStatus('error')
				return
			}

			try {
				let attempts = 0
				const maxAttempts = 10

				const checkStatus = async () => {
					const response = await getPaymentStatus(localId)

					if (response.success && response.payment) {
						const paymentStatus = response.payment.status

						if (['success', 'failure', 'expired'].includes(paymentStatus)) {
							setStatus(paymentStatus)
							setPaymentData(response.payment)

							localStorage.removeItem('lastPaymentId')
							return true
						}

						if (attempts < maxAttempts) {
							attempts++
							setTimeout(checkStatus, 2000)
						} else {
							setStatus('processing')
							setPaymentData(response.payment)
							localStorage.removeItem('lastPaymentId')
						}
					} else {
						setError('Не вдалося отримати статус платежу')
						setStatus('error')
					}
				}

				await checkStatus()
			} catch (err) {
				console.error('❌ Помилка перевірки статусу:', err)
				setError("Помилка з'єднання з сервером")
				setStatus('error')
			}
		}

		checkPaymentStatus()
	}, [paymentId])

	const handleGoHome = () => navigate('/')
	const handleGoProgram = () => navigate('/program')

	return (
		<Page>
			{status === 'loading' && (
				<Card>
					<Icon>⏳</Icon>
					<Title>Перевірка статусу платежу...</Title>
					<Text>Будь ласка, зачекайте</Text>
				</Card>
			)}

			{status === 'success' && (
				<Card status='success'>
					<Icon>✅</Icon>
					<Title>Оплата успішна!</Title>
					<Text>Дякуємо за оплату. Вашу реєстрацію підтверджено.</Text>
					<Text>
						На пошту вам було надіслано листа з підтвердженням оплати.
					</Text>

					<Actions>
						<ButtonContained text='На головну' onClick={handleGoHome} />
					</Actions>
				</Card>
			)}

			{status === 'failure' && (
				<Card status='failure'>
					<Icon>❌</Icon>
					<Title>Оплата не пройшла</Title>
					<Text>На жаль, під час оплати виникла помилка.</Text>

					{paymentData?.failureReason && (
						<Text>
							<strong>Причина:</strong> {paymentData.failureReason}
						</Text>
					)}

					<Actions>
						<ButtonOutlined
							text='На сторінку тренувань'
							onClick={handleGoProgram}
						/>
						<ButtonContained text='На головну' onClick={handleGoHome} />
					</Actions>
				</Card>
			)}

			{status === 'processing' && (
				<Card status='processing'>
					<Icon>⏳</Icon>
					<Title>Платіж обробляється</Title>
					<Text>
						Ваш платіж знаходиться в обробці. Це може зайняти кілька хвилин.
					</Text>
					<Text>Ми надішлемо вам email після завершення.</Text>

					<Actions>
						<ButtonContained text='На головну' onClick={handleGoHome} />
					</Actions>
				</Card>
			)}

			{status === 'expired' && (
				<Card status='expired'>
					<Icon>⏰</Icon>
					<Title>Термін оплати минув</Title>
					<Text>На жаль, термін дії рахунку закінчився.</Text>
					<Text>Зв'яжіться з нами для вирішення цього питання.</Text>

					<Actions>
						<ButtonContained text='На головну' onClick={handleGoHome} />
					</Actions>
				</Card>
			)}

			{status === 'error' && (
				<Card status='failure'>
					<Icon>⚠️</Icon>
					<Title>Виникла помилка</Title>
					<Text>{error || 'Не вдалося перевірити статус платежу'}</Text>

					<Actions>
						<ButtonContained text='На головну' onClick={handleGoHome} />
					</Actions>
				</Card>
			)}
		</Page>
	)
}

export default PaymentResultPage

// ==== Styled components ====
const Page = styled('div')(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	minHeight: '70vh',
	backgroundColor: theme.palette.background.default,
	padding: '20px',
}))

const Card = styled('div')<{ status?: string }>(({ theme, status }) => {
	let bgColor = theme.palette.background.paper
	let borderColor = theme.palette.grey[400]

	if (status === 'success') {
		bgColor = theme.palette.success.light
		borderColor = theme.palette.success.main
	}
	if (status === 'failure') {
		bgColor = theme.palette.error.light
		borderColor = theme.palette.error.main
	}
	if (status === 'processing') {
		bgColor = theme.palette.warning.light
		borderColor = theme.palette.warning.main
	}
	if (status === 'expired') {
		bgColor = theme.palette.grey[300]
		borderColor = theme.palette.grey[500]
	}

	return {
		width: '100%',
		maxWidth: 300,
		borderRadius: 12,
		padding: '24px',
		boxShadow: theme.shadows[4],
		backgroundColor: bgColor,
		border: `2px solid ${borderColor}`,
		textAlign: 'center',
	}
})

const Icon = styled('div')({
	fontSize: '48px',
	marginBottom: '16px',
})

const Title = styled('h2')(({ theme }) => ({
	marginBottom: '8px',
	fontSize: '1.5rem',
	color: theme.palette.text.primary,
}))

const Text = styled('p')(({ theme }) => ({
	marginBottom: '12px',
	color: theme.palette.text.secondary,
}))

const Actions = styled('div')({
	display: 'flex',
	justifyContent: 'center',
	gap: '12px',
	marginTop: '20px',
})
