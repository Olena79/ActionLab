import React, { useEffect, useState } from 'react'
import { Box, styled } from '@mui/system'
import { InfoMessage, ISeminar } from '../../types/seminar'
import { useTranslation } from '../../translation/TranslationContext'
import { getFutureSeminars } from '../../actions/seminarActions'
import { registerUser } from '../../actions/authActions'
import { SeminarSelect, TextInput } from './SeminarSelect'
import ButtonContained from '../ButtonContained'
import { createMonobankInvoice } from '../../actions/monobank'

interface UserRegModalProps {
	onClose?: () => void
	onSuccess: (msg: InfoMessage) => void
}

const UserRegModal: React.FC<UserRegModalProps> = ({ onClose, onSuccess }) => {
	const { t } = useTranslation()
	const [seminars, setSeminars] = useState<ISeminar[]>([])
	const [loading, setLoading] = useState(true)
	const [selectedSeminarId, setSelectedSeminarId] = useState('')

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')

	const [errors, setErrors] = useState<Record<string, string>>({})
	const [touched, setTouched] = useState<Record<string, boolean>>({})

	// fetch seminars
	useEffect(() => {
		const fetch = async () => {
			try {
				const data = await getFutureSeminars()
				setSeminars(data)
			} catch (e) {
				console.error(e)
			} finally {
				setLoading(false)
			}
		}
		fetch()
	}, [])

	// validate
	useEffect(() => {
		const newErrors: Record<string, string> = {}
		if (touched.seminar && !selectedSeminarId)
			newErrors.seminar = t('semRegist.formErrors.seminar')
		if (touched.firstName && firstName.trim().length < 2)
			newErrors.firstName = t('semRegist.formErrors.name')
		if (touched.lastName && lastName.trim().length < 2)
			newErrors.lastName = t('semRegist.formErrors.surname')
		if (touched.phone && !/^[0-9+\-\s]{7,}$/.test(phone))
			newErrors.phone = t('semRegist.formErrors.phone')
		if (touched.email && !/\S+@\S+\.\S+/.test(email))
			newErrors.email = t('semRegist.formErrors.email')
		setErrors(newErrors)
	}, [selectedSeminarId, firstName, lastName, phone, email, touched, t])

	const isFormValid =
		!!selectedSeminarId &&
		!!firstName &&
		!!lastName &&
		!!phone &&
		!!email &&
		Object.keys(errors).length === 0

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!isFormValid) return

		const seminar = seminars.find(s => s._id === selectedSeminarId)
		if (!seminar) return

		try {
			const response = await registerUser({
				title: seminar.title,
				date: seminar.date,
				isPaid: false,
				firstName,
				lastName,
				phone,
				email,
			})

			console.log('✅ Відповідь від беку:', response)

			// Розбираємося з відповіді беку
			switch (response.message) {
				case 'registered':
					onSuccess({
						title: t('registerModalMessages.success.title'),
						message1: t('registerModalMessages.success.message1'),
						message2: t('registerModalMessages.success.message2'),
						showPayButton: true,
						onPay: async () => {
							try {
								const invoice = await createMonobankInvoice({
									userId: response.userId,
									seminarId: seminar._id,
									amount: 400000, // 4000 грн у копійках
									currency: 'UAH',
								})

								if (invoice.success && invoice.invoiceUrl) {
									window.location.href = invoice.invoiceUrl // редірект
								} else {
									alert('Error Payment')
								}
							} catch (err) {
								console.error(err)
								onSuccess({
									title: t('payment.error.title'),
									message1: t('payment.error.message1'),
									message2: t('payment.error.message2'),
									showPayButton: false,
								})
							}
						},
					})
					break

				case 'already_registered':
					onSuccess({
						title: t('registerModalMessages.warning.alreadyRegistered.title'),
						message1:
							t('registerModalMessages.warning.alreadyRegistered.message1') ||
							'Ви вже зареєстровані на цей семінар',
						message2: t(
							'registerModalMessages.warning.alreadyRegistered.message2'
						),
						showPayButton: false,
					})
					break

				case 'email_exists':
					onSuccess({
						title:
							t('registerModalMessages.warning..emailExists.title') ||
							'Пошта уже використовується',
						message1:
							t('registerModalMessages.warning..emailExists.message1') ||
							'Користувач з такою поштою вже існує.',
						message2:
							t('registerModalMessages.warning..emailExists.message2') ||
							'Якщо це ваша пошта, будь ласка, увійдіть або використайте інший телефон.',
						showPayButton: false,
					})
					break

				case 'phone_exists':
					onSuccess({
						title:
							t('registerModalMessages.warning.phoneExists') ||
							'Телефон уже використано',
						message1:
							t('registerModalMessages.warning.phoneExists') ||
							'Користувач з таким телефоном вже існує.',
						message2:
							t('registerModalMessages.warning.phoneExists') ||
							'Якщо це ваш номер, будь ласка, увійдіть або використайте іншу пошту.',
						showPayButton: false,
					})
					break

				case 'email_phone_conflict':
					onSuccess({
						title:
							t('registerModalMessages.warning.emailPhoneConflict.title') ||
							'Конфлікт даних',
						message1:
							t('registerModalMessages.warning.emailPhoneConflic.message1t') ||
							"Пошта і номер телефону належать різним обліковим записам. Будь ласка, зв'яжіться з підтримкою.",
						message2: t(
							'registerModalMessages.warning.emailPhoneConflict.message2'
						),
						showPayButton: false,
					})
					break

				default:
					// помилка або невідома відповідь
					onSuccess({
						title: t('registerModalMessages.error.title'),
						message1: t('registerModalMessages.error.message1'),
						message2: t('registerModalMessages.error.message2'),
						showPayButton: false,
					})
					break
			}
		} catch (err) {
			console.error('❌ Помилка запиту:', err)
			onSuccess({
				title: t('registerModalMessages.error.title'),
				message1: t('registerModalMessages.error.message1'),
				message2: t('registerModalMessages.error.message2'),
				showPayButton: false,
			})
		}
	}

	return (
		<ModalOverlay onClick={onClose}>
			<ModalContent onClick={e => e.stopPropagation()}>
				<ImageBox>
					<Form onSubmit={handleSubmit}>
						<CloseButton type='button' onClick={() => onClose?.()}>
							×
						</CloseButton>
						<SeminarSelect
							value={selectedSeminarId}
							seminars={seminars}
							error={errors.seminar}
							touched={!!touched.seminar}
							onChange={setSelectedSeminarId}
							onFocus={() => setTouched(prev => ({ ...prev, seminar: true }))}
							disabled={loading}
							placeholder={t('semRegist.seminar.select')}
							label={t('semRegist.seminar.seminarSelect')}
						/>
						<Row>
							<TextInput
								type='text'
								value={firstName}
								error={errors.firstName}
								touched={!!touched.firstName}
								placeholder={t('semRegist.form.firstName')}
								onChange={setFirstName}
								onFocus={() =>
									setTouched(prev => ({ ...prev, firstName: true }))
								}
							/>
							<TextInput
								type='text'
								value={lastName}
								error={errors.lastName}
								touched={!!touched.lastName}
								placeholder={t('semRegist.form.lastName')}
								onChange={setLastName}
								onFocus={() =>
									setTouched(prev => ({ ...prev, lastName: true }))
								}
							/>
						</Row>

						<Row>
							<TextInput
								type='tel'
								value={phone}
								error={errors.phone}
								touched={!!touched.phone}
								placeholder={t('semRegist.form.phone')}
								onChange={setPhone}
								onFocus={() => setTouched(prev => ({ ...prev, phone: true }))}
							/>
							<TextInput
								type='email'
								value={email}
								error={errors.email}
								touched={!!touched.email}
								placeholder={t('semRegist.form.email')}
								onChange={setEmail}
								onFocus={() => setTouched(prev => ({ ...prev, email: true }))}
							/>
						</Row>

						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<ButtonContained
								text={t('semRegist.seminar.registerButton')}
								type='submit'
								disabled={!isFormValid}
								sx={{ width: '80%' }}
							/>
						</Box>
						<FieldLabel
							sx={{ textAlign: 'center', marginTop: '-5px', fontSize: 9 }}
						>
							<Required>*{t('semRegist.seminar.requiredFields')}</Required>
						</FieldLabel>
					</Form>
				</ImageBox>
			</ModalContent>
		</ModalOverlay>
	)
}

export default UserRegModal
//===================//=======================//
const ModalOverlay = styled('div')({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: 'rgba(0,0,0,0.4)',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	zIndex: 1000,
})

const ModalContent = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	padding: '12px',
	borderRadius: 8,
	width: '90%',
	maxWidth: 400,
}))

const ImageBox = styled(Box)({
	backgroundImage:
		'url(https://res.cloudinary.com/dsgqhwqr7/image/upload/v1757845388/1682_ucaugt.jpg)',
	backgroundSize: 'contain', // Покриває всю область
	backgroundPosition: 'center', // Центрує зображення
	backgroundRepeat: 'no-repeat', // Не повторює зображення
	width: '100%',
})

const Form = styled('form')({
	display: 'flex',
	flexDirection: 'column',
	gap: 8,
	position: 'relative',
	padding: '20px',
	width: '100%',
	cursor: 'auto',
	textTransform: 'none',
	marginTop: 8,
	borderRadius: 8,
})

const CloseButton = styled('button')(({ theme }) => ({
	position: 'absolute',
	top: 0,
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

const Row = styled('div')({
	display: 'flex',
	gap: 8,
})

const FieldLabel = styled('label')({
	fontSize: 12,
	fontWeight: 600,
	marginBottom: '4px',
})

const Required = styled('span')({
	color: 'red',
	marginLeft: '2px',
})
