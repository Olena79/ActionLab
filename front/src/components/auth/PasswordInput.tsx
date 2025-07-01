import React, { useState } from 'react'
import { styled } from '@mui/system'

const Wrapper = styled('div')({
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	gap: 4,
})

const Input = styled('input')({
	padding: '8px 36px 8px 8px', // місце під іконку справа
	border: '1px solid #ccc',
	borderRadius: 4,
	width: '100%',
})

const ToggleButton = styled('button')({
	position: 'absolute',
	right: 8,
	top: 20,
	transform: 'translateY(-50%)',
	background: 'transparent',
	border: 'none',
	cursor: 'pointer',
	fontSize: 16,
})

const Error = styled('span')({
	color: 'red',
	fontSize: '0.85rem',
	minHeight: '1.2em',
})

type PasswordInputProps = {
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	placeholder?: string
	error?: string
	onBlur?: () => void
	onFocus?: () => void
}

const PasswordInput: React.FC<PasswordInputProps> = ({
	value,
	onChange,
	placeholder,
	error,
	onBlur,
	onFocus,
}) => {
	const [show, setShow] = useState(false)

	return (
		<Wrapper>
			<Input
				type={show ? 'text' : 'password'}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
				placeholder={placeholder}
			/>
			<ToggleButton type='button' onClick={() => setShow(prev => !prev)}>
				{show ? '🙈' : '👁'}
			</ToggleButton>
			<Error>{error || ''}</Error>
		</Wrapper>
	)
}

export default PasswordInput
