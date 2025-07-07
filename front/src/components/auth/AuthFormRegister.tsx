import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { styled } from '@mui/system'
import GoogleAuthButton from './GoogleAuthButton'
import PasswordInput from './PasswordInput'
import { useTranslation } from '../../translation/TranslationContext'
import { registerUser } from '../../actions/authActions'

const Form = styled('form')({
	display: 'flex',
	flexDirection: 'column',
	gap: 12,
})

const InputBlock = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	gap: 4,
})

const Input = styled('input')({
	padding: 8,
	border: '1px solid #ccc',
	borderRadius: 4,
})

const Select = styled('select')({
	padding: 8,
	border: '1px solid #ccc',
	borderRadius: 4,
})

const Error = styled('span')({
	color: 'red',
	fontSize: '0.85rem',
	minHeight: '1.2em',
})

const SubmitButton = styled('button')(
	({ disabled }: { disabled?: boolean }) => ({
		padding: 8,
		backgroundColor: disabled ? '#aaa' : '#2e7d32',
		color: '#fff',
		border: 'none',
		borderRadius: 4,
		cursor: disabled ? 'not-allowed' : 'pointer',
		transition: 'background 0.3s',
		'&:hover': {
			backgroundColor: disabled ? '#aaa' : '#1b5e20',
		},
	})
)

const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email)
const isPasswordValid = (password: string): boolean => {
	return (
		/[A-Z]/.test(password) &&
		/[a-z]/.test(password) &&
		/[0-9]/.test(password) &&
		/[!@#$%^&*(),.?":{}|<>]/.test(password) &&
		password.length >= 8
	)
}

interface AuthFormRegisterProps {
	onSuccess: (msg: {
		title: string
		message1: string
		message2: string
		action?: {
			label: string
			onClick: () => void
		}
	}) => void
	onSwitchToLogin?: () => void
}

const AuthFormRegister: React.FC<AuthFormRegisterProps> = ({
	onSuccess,
	onSwitchToLogin,
}) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [role, setRole] = useState<'user' | 'coach'>('user')

	const [errors, setErrors] = useState<Record<string, string>>({})
	const [isTouched, setIsTouched] = useState<Record<string, boolean>>({
		name: false,
		email: false,
		password: false,
		confirmPassword: false,
	})
	const { t, lang } = useTranslation()

	useEffect(() => {
		const newErrors: typeof errors = {}

		if (isTouched.name && (!name || name.trim().length < 2)) {
			newErrors.name = `${t('auth.register.addName')}`
		}

		if (isTouched.email) {
			if (!email) newErrors.email = `${t('auth.login.emailNeed')}`
			else if (!isEmailValid(email))
				newErrors.email = `${t('auth.login.emailInvalid')}`
		}

		if (isTouched.password) {
			if (!password) newErrors.password = `${t('auth.login.passwordNeed')}`
			else if (!isPasswordValid(password)) {
				newErrors.password = `${t('auth.login.passwordInvalid')}`
			}
		}

		if (isTouched.confirmPassword) {
			if (password !== confirmPassword) {
				newErrors.confirmPassword = `${t('auth.register.confirmPassword')}`
			}
		}

		setErrors(newErrors)
	}, [name, email, password, confirmPassword, isTouched, t])

	const isFormValid =
		!!name &&
		!!email &&
		!!password &&
		!!confirmPassword &&
		Object.keys(errors).length === 0

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!isFormValid) return

		try {
			const normalizedLang = lang.toLowerCase() as 'ua' | 'en'
			const response = await registerUser({
				name,
				email,
				password,
				role,
				language: normalizedLang,
			})
			if (role === 'coach') {
				onSuccess({
					title: t('auth.register.successCoach.title'),
					message1: t('auth.register.successCoach.message1'),
					message2: t('auth.register.successCoach.message2'),
				})
			} else {
				onSuccess({
					title: t('auth.register.successMessage.title'),
					message1: t('auth.register.successMessage.message1'),
					message2: t('auth.register.successMessage.message2'),
				})
			}
			console.log('✅ Реєстрація успішна:', response.message)
		} catch (err: unknown) {
			console.error('❌ Помилка реєстрації:', err)

			if (axios.isAxiosError(err)) {
				const status = err.response?.status
				if (status === 409) {
					onSuccess({
						title: t('auth.register.errorMessage.emailExistsTitle'),
						message1: t('auth.register.errorMessage.emailExistsLine1'),
						message2: t('auth.register.errorMessage.emailExistsLine2'),
						action: {
							label: t('auth.register.loginLink'),
							onClick: onSwitchToLogin || (() => {}),
						},
					})
					return
				}
			}

			// Всі інші помилки
			onSuccess({
				title: t('auth.register.errorMessage.title'),
				message1: t('auth.register.errorMessage.message1'),
				message2: t('auth.register.errorMessage.message2'),
			})
		}
	}

	return (
		<Form onSubmit={handleSubmit}>
			<GoogleAuthButton />

			<InputBlock>
				<Input
					type='text'
					placeholder='Name'
					value={name}
					onChange={e => setName(e.target.value)}
					onFocus={() => setIsTouched(prev => ({ ...prev, name: true }))}
				/>
				<Error>{errors.name || ''}</Error>
			</InputBlock>

			<InputBlock>
				<Input
					type='text'
					placeholder='Email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					onFocus={() => setIsTouched(prev => ({ ...prev, email: true }))}
				/>
				<Error>{errors.email || ''}</Error>
			</InputBlock>

			<InputBlock>
				<PasswordInput
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					onFocus={() => setIsTouched(prev => ({ ...prev, password: true }))}
					error={errors.password}
				/>
			</InputBlock>

			<InputBlock>
				<PasswordInput
					placeholder='Confirm Password'
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
					onFocus={() =>
						setIsTouched(prev => ({ ...prev, confirmPassword: true }))
					}
					error={errors.confirmPassword}
				/>
			</InputBlock>

			<Select
				value={role}
				onChange={e => setRole(e.target.value as 'user' | 'coach')}
			>
				<option value='user'>{t('auth.register.userRole')}</option>
				<option value='coach'>{t('auth.register.coachRole')}</option>
			</Select>

			<SubmitButton type='submit' disabled={!isFormValid}>
				{t('auth.register.buttonIn')}
			</SubmitButton>
		</Form>
	)
}

export default AuthFormRegister
