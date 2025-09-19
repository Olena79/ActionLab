import React, { useEffect, useState } from 'react'
import { Box, styled } from '@mui/system'
import { InfoMessage, ISeminar } from '../../types/seminar'
import { useTranslation } from '../../translation/TranslationContext'
import { registerUser } from '../../actions/authActions'
import ButtonContained from '../ButtonContained'
// import { createMonobankInvoice } from '../../actions/monobank'
import { TextInput } from './SeminarSelect'

interface SeminarRegModalProps {
	seminar: ISeminar
	onClose?: () => void
	onSuccess: (msg: InfoMessage) => void
}

const SeminarRegModal: React.FC<SeminarRegModalProps> = ({
	seminar,
	onClose,
	onSuccess,
}) => {
	const { t } = useTranslation()

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')

	const [errors, setErrors] = useState<Record<string, string>>({})
	const [touched, setTouched] = useState<Record<string, boolean>>({})

	// validate
	useEffect(() => {
		const newErrors: Record<string, string> = {}
		if (touched.firstName && firstName.trim().length < 2)
			newErrors.firstName = t('semRegist.formErrors.name')
		if (touched.lastName && lastName.trim().length < 2)
			newErrors.lastName = t('semRegist.formErrors.surname')
		if (touched.phone && !/^\d{10}$/.test(phone))
			newErrors.phone =
				t('semRegist.formErrors.phone') + ' ' + t('semRegist.formErrors.phone2')
		if (touched.email && !/\S+@\S+\.\S+/.test(email))
			newErrors.email = t('semRegist.formErrors.email')
		setErrors(newErrors)
	}, [firstName, lastName, phone, email, touched, t])

	const isFormValid =
		!!firstName &&
		!!lastName &&
		!!phone &&
		!!email &&
		Object.keys(errors).length === 0

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!isFormValid) return

		try {
			const response = await registerUser({
				title: seminar.title,
				date: seminar.selectedDate!.date,
				isPaid: false,
				firstName,
				lastName,
				phone,
				email,
			})

			switch (response.message) {
				case 'registered':
					onSuccess({
						title: t('registerModalMessages.success.title'),
						message1: t('registerModalMessages.success.message1'),
						message2: t('registerModalMessages.success.message2'),
						showPayButton: true,
						onPay: () => {},
						userData: { firstName, lastName, phone, email },
						// onPay: async () => {
						// 	try {
						// 		const invoice = await createMonobankInvoice({
						// 			userId: response.userId,
						// 			seminarId: seminar._id,
						// 			amount: 400000, // 4000 грн у копійках
						// 			currency: 'UAH',
						// 		})

						// 		if (invoice.success && invoice.invoiceUrl) {
						// 			window.location.href = invoice.invoiceUrl
						// 		} else {
						// 			alert('Error Payment')
						// 		}
						// 	} catch (err) {
						// 		console.error(err)
						// 		onSuccess({
						// 			title: t('payment.error.title'),
						// 			message1: t('payment.error.message1'),
						// 			message2: t('payment.error.message2'),
						// 			showPayButton: false,
						// 		})
						// 	}
						// },
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
							t('registerModalMessages.warning.emailExists.title') ||
							'Пошта уже використовується',
						message1:
							t('registerModalMessages.warning.emailExists.message1') ||
							'Користувач з такою поштою вже існує.',
						message2:
							t('registerModalMessages.warning.emailExists.message2') ||
							'Якщо це ваша пошта, будь ласка, увійдіть або використайте інший телефон.',
						showPayButton: false,
					})
					break

				case 'phone_exists':
					onSuccess({
						title:
							t('registerModalMessages.warning.phoneExists.title') ||
							'Телефон уже використано',
						message1:
							t('registerModalMessages.warning.phoneExists.message1') ||
							'Користувач з таким телефоном вже існує.',
						message2:
							t('registerModalMessages.warning.phoneExists.message2') ||
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
							t('registerModalMessages.warning.emailPhoneConflict.message1') ||
							"Пошта і номер телефону належать різним обліковим записам. Будь ласка, зв'яжіться з підтримкою.",
						message2: t(
							'registerModalMessages.warning.emailPhoneConflict.message2'
						),
						showPayButton: false,
					})
					break

				default:
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

						<Row sx={{ marginTop: 2 }}>
							<TextInput
								type='text'
								value={firstName}
								error={errors.firstName}
								touched={!!touched.firstName}
								placeholder={t('semRegist.form.firstName')}
								onChange={value => {
									// Приймаємо тільки букви
									const filtered = value.replace(
										/[^a-zA-Zа-яА-ЯёЁіІїЇєЄ'-\s]/g,
										''
									)
									setFirstName(filtered)
								}}
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
								onChange={value => {
									const filtered = value.replace(
										/[^a-zA-Zа-яА-ЯёЁіІїЇєЄ'-\s]/g,
										''
									)
									setLastName(filtered)
								}}
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
								onChange={value => {
									// Приймаємо тільки цифри, максимум 10 символів
									const filtered = value.replace(/[^0-9]/g, '').slice(0, 10)
									setPhone(filtered)
								}}
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

export default SeminarRegModal
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
