import React, { useEffect, useState } from 'react'
import UserRegModal from './UserRegModal'
import ConfirmModal from '../ConfirmModal'
import { InfoMessage } from '../../types/seminar'
import ButtonContained from '../ButtonContained'
import { useTranslation } from '../../translation/TranslationContext'
import { useSearchParams } from 'react-router-dom'
import { getPaymentStatus } from '../../actions/monobank'

const RegisterBtn = () => {
	const { t } = useTranslation()
	const [searchParams] = useSearchParams()
	const [isAuthOpen, setIsAuthOpen] = useState(false)
	const [infoMessage, setInfoMessage] = useState<InfoMessage | null>(null)

	const handleCloseModal = () => setInfoMessage(null)

	useEffect(() => {
		const userId = searchParams.get('userId')
		const seminarId = searchParams.get('seminarId')

		if (!userId || !seminarId) return

		const fetchStatus = async () => {
			try {
				const data = await getPaymentStatus(userId, seminarId) // передаємо два аргументи
				if (data.success) {
					setInfoMessage({
						title: data.isPaid
							? t('payment.success.title')
							: t('payment.pending.title'),
						message1: data.isPaid
							? t('payment.success.message1')
							: t('payment.pending.message1'),
						message2: data.isPaid
							? t('payment.success.message2')
							: t('payment.pending.message2'),
						showPayButton: false, // кнопка не потрібна
					})
				}
			} catch (err) {
				console.error('❌ Помилка отримання статусу платежу:', err)
			}
		}

		fetchStatus()
	}, [searchParams, t])

	return (
		<>
			<ButtonContained
				text={t('join')}
				type='button'
				onClick={() => setIsAuthOpen(true)}
			></ButtonContained>
			{isAuthOpen && (
				<UserRegModal
					onClose={() => setIsAuthOpen(false)}
					onSuccess={(msg: InfoMessage) => {
						setInfoMessage(msg)
						setIsAuthOpen(false)
					}}
				/>
			)}

			{infoMessage && (
				<ConfirmModal
					open={true}
					title={infoMessage.title}
					message1={infoMessage.message1}
					message2={infoMessage.message2}
					showPayButton={infoMessage.showPayButton ?? false}
					onPay={infoMessage.onPay}
					onClose={handleCloseModal}
				/>
			)}
		</>
	)
}

export default RegisterBtn

//======================//=======================//
