import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import GoogleAuthButton from './GoogleAuthButton'
import PasswordInput from './PasswordInput'
import { useTranslation } from '../../translation/TranslationContext'

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

const Error = styled('span')({
	color: 'red',
	fontSize: '0.85rem',
	minHeight: '1.2em',
})

const SubmitButton = styled('button')(
	({ disabled }: { disabled?: boolean }) => ({
		padding: 8,
		backgroundColor: disabled ? '#aaa' : '#1976d2',
		color: '#fff',
		border: 'none',
		borderRadius: 4,
		cursor: disabled ? 'not-allowed' : 'pointer',
		transition: 'background 0.3s',
		'&:hover': {
			backgroundColor: disabled ? '#aaa' : '#125a9c',
		},
	})
)

const isPasswordValid = (password: string): boolean => {
	return (
		/[A-Z]/.test(password) &&
		/[a-z]/.test(password) &&
		/[0-9]/.test(password) &&
		/[!@#$%^&*(),.?":{}|<>]/.test(password) &&
		password.length >= 8
	)
}

const isEmailValid = (email: string): boolean => /\S+@\S+\.\S+/.test(email)

const AuthFormLogin: React.FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState<{ email?: string; password?: string }>(
		{}
	)
	const [isTouched, setIsTouched] = useState<{
		email: boolean
		password: boolean
	}>({
		email: false,
		password: false,
	})
	const { t } = useTranslation()

	useEffect(() => {
		const newErrors: typeof errors = {}
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
		setErrors(newErrors)
	}, [email, password, isTouched, t])

	const isFormValid = !!email && !!password && Object.keys(errors).length === 0

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!isFormValid) return
		console.log('Login with:', { email, password })
	}

	return (
		<Form onSubmit={handleSubmit}>
			<GoogleAuthButton />
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
			<SubmitButton type='submit' disabled={!isFormValid}>
				{t('auth.login.buttonIn')}
			</SubmitButton>
		</Form>
	)
}

export default AuthFormLogin
