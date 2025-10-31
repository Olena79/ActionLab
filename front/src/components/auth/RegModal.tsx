import React, { useState, useRef, useEffect } from 'react'
import { Box, Modal, styled, CircularProgress } from '@mui/material'
import ButtonContained from '../ButtonContained'
import { registerUser } from '../../actions/authActions'
import { createInvoice } from '../../actions/monobank'
import { No, Yes } from '../../icons/CheckMarks'
import { useTranslation } from '../../translation/TranslationContext'

interface RegModalProps {
	open: boolean
	onClose: () => void
}

export const RegModal: React.FC<RegModalProps> = ({ open, onClose }) => {
	const { t } = useTranslation()

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<Record<string, string>>({})
	const [globalError, setGlobalError] = useState('')

	const [isTouched, setIsTouched] = useState<Record<string, boolean>>({
		firstName: false,
		lastName: false,
		phone: false,
		email: false,
	})

	const creatingRef = useRef(false)

	// Валідація
	useEffect(() => {
		const newErrors: typeof error = {}

		if (isTouched.firstName && firstName.trim().length < 2) {
			newErrors.firstName = t('semRegist.formErrors.name')
		}

		if (isTouched.lastName && lastName.trim().length < 2) {
			newErrors.lastName = t('semRegist.formErrors.surname')
		}

		if (isTouched.phone && !/^\d{10}$/.test(phone)) {
			newErrors.phone = t('semRegist.formErrors.phone')
		}

		if (isTouched.email && !/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = t('semRegist.formErrors.email')
		}

		setError(newErrors)
	}, [firstName, lastName, phone, email, isTouched, t])

	const isFormValid =
		!!firstName &&
		!!lastName &&
		!!phone &&
		!!email &&
		Object.keys(error).length === 0

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!isFormValid) return

		if (creatingRef.current) return
		creatingRef.current = true
		setLoading(true)
		setGlobalError('')

		try {
			// 1️⃣ Створення користувача
			const userPayload = {
				date: new Date(),
				firstName,
				lastName,
				phone,
				email,
			}

			const userResponse = await registerUser(userPayload)

			if (
				!userResponse?.success ||
				userResponse.message === 'email_phone_conflict'
			) {
				alert(
					'Електронна пошта і номер телефону належать різним обліковим записам! Будь ласка, зверніться до служби підтримки.'
				)
				return
			} else if (
				!userResponse?.success ||
				userResponse.message === 'phone_exists'
			) {
				alert(
					'Увага! Користувач з таким номером телефону вже зареєстрований. Якщо це ваш номер, будь ласка, вкажіть іншу електронну пошту.'
				)
				return
			} else if (
				!userResponse?.success ||
				userResponse.message === 'email_exists'
			) {
				alert(
					'Увага! Користувач з такою електронною поштою вже зареєстрований. Якщо це ваша пошта, будь ласка, вкажіть інший номер телефону.'
				)
				return
			}
			if (!userResponse?.userId) {
				alert('Помилка створення користувача!')
				return
			}

			const userId = userResponse.userId
			const membershipId = userResponse.membershipId

			// 2️⃣ Створення інвойсу
			const invoiceResponse = await createInvoice({
				membershipId,
				userId,
				amount: 400000, // 4000 грн (як приклад)
				currency: 'UAH',
			})

			if (!invoiceResponse?.success || !invoiceResponse?.invoiceUrl) {
				throw new Error('Не вдалося створити інвойс')
			}

			// 3️⃣ Перенаправлення на оплату
			window.location.href = invoiceResponse.invoiceUrl
		} catch (err: any) {
			console.error(err)
			setGlobalError('Сталася помилка. Спробуйте пізніше.')
		} finally {
			setLoading(false)
			creatingRef.current = false
		}
	}

	return (
		<Modal open={open} onClose={onClose}>
			<ModalBox>
				<ImageBox>
					<CloseButton type='button' onClick={() => onClose?.()}>
						×
					</CloseButton>
					<Form onSubmit={handleSubmit}>
						<Row>
							{/* First Name */}
							<FieldWrapper>
								<InputBlock>
									<ValidationIcon>
										{error.firstName ? <No /> : isTouched.firstName && <Yes />}
									</ValidationIcon>
									<Input
										type='text'
										value={firstName}
										onChange={e => setFirstName(e.target.value)}
										onFocus={() =>
											setIsTouched(prev => ({ ...prev, firstName: true }))
										}
										placeholder={t('semRegist.form.firstName')}
									/>
								</InputBlock>
								<StyledError>{error.firstName || ''}</StyledError>
							</FieldWrapper>

							{/* Last Name */}
							<FieldWrapper>
								<InputBlock>
									<ValidationIcon>
										{error.lastName ? <No /> : isTouched.lastName && <Yes />}
									</ValidationIcon>
									<Input
										type='text'
										value={lastName}
										onChange={e => setLastName(e.target.value)}
										onFocus={() =>
											setIsTouched(prev => ({ ...prev, lastName: true }))
										}
										placeholder={t('semRegist.form.lastName')}
									/>
								</InputBlock>
								<StyledError>{error.lastName || ''}</StyledError>
							</FieldWrapper>
						</Row>

						<Row>
							{/* Phone */}
							<FieldWrapper>
								<InputBlock>
									<ValidationIcon>
										{error.phone ? <No /> : isTouched.phone && <Yes />}
									</ValidationIcon>
									<Input
										type='tel'
										value={phone}
										maxLength={10}
										pattern='[0-9+\-\s]*'
										onChange={e => setPhone(e.target.value)}
										onFocus={() =>
											setIsTouched(prev => ({ ...prev, phone: true }))
										}
										placeholder={t('semRegist.form.phone')}
									/>
								</InputBlock>
								<StyledError>{error.phone || ''}</StyledError>
							</FieldWrapper>

							{/* Email */}
							<FieldWrapper>
								<InputBlock>
									<ValidationIcon>
										{error.email ? <No /> : isTouched.email && <Yes />}
									</ValidationIcon>
									<Input
										type='email'
										value={email}
										onChange={e => setEmail(e.target.value)}
										onFocus={() =>
											setIsTouched(prev => ({ ...prev, email: true }))
										}
										placeholder={t('semRegist.form.email')}
									/>
								</InputBlock>
								<StyledError>{error.email || ''}</StyledError>
							</FieldWrapper>
						</Row>

						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<ButtonContained
								text={t('semRegist.seminar.registerButton')}
								type='submit'
								disabled={!isFormValid}
								sx={{ width: '80%' }}
							/>
						</Box>

						<Required>* Всі поля обов'язкові</Required>

						{globalError && (
							<StyledError style={{ marginTop: '8px' }}>
								{globalError}
							</StyledError>
						)}
					</Form>
				</ImageBox>

				{loading && <CircularProgress />}
			</ModalBox>
		</Modal>
	)
}

export default RegModal

// ==================== styled =====================

const ModalBox = styled(Box)(() => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '90%',
	maxWidth: 300,
	background: '#fff',
	borderRadius: 12,
	padding: '12px 0',
	boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'stretch',
	positioning: 'relative',
}))

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
})

const CloseButton = styled('button')(({ theme }) => ({
	position: 'absolute',
	top: 3,
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

const Input = styled('input')(({ theme }) => ({
	padding: 6,
	border: `1px solid ${theme.palette.secondary.main}`,
	borderRadius: 6,
	fontSize: 14,
	width: '100%',
}))

const StyledError = styled('span')({
	color: 'red',
	fontSize: 10,
	minHeight: '1.2em',
	marginLeft: 24,
})

const FieldWrapper = styled('div')({
	display: 'flex',
	flexDirection: 'column',
})

const Required = styled('span')({
	textAlign: 'center',
	fontSize: 10,
	fontWeight: 600,
	marginTop: '-4px',
	marginBottom: '4px',
	color: 'red',
})

const InputBlock = styled('div')({
	display: 'flex',
	alignItems: 'center',
	position: 'relative',
})

const ValidationIcon = styled('span')({
	width: '18px',
	marginRight: '6px',
	fontSize: '14px',
	color: 'red',
	'&:contains("✔")': {
		color: 'green',
	},
})

const Row = styled('div')({
	display: 'flex',
	gap: 8,
})

const ImageBox = styled(Box)({
	backgroundImage:
		'url(https://res.cloudinary.com/dsgqhwqr7/image/upload/v1757845388/1682_ucaugt.jpg)',
	backgroundSize: 'contain', // Покриває всю область
	backgroundPosition: 'center', // Центрує зображення
	backgroundRepeat: 'no-repeat', // Не повторює зображення
	width: '100%',
})
