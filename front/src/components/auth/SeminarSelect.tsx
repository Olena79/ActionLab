import React from 'react'
import { No, Yes } from '../../icons/CheckMarks'
import { styled } from '@mui/material'

interface SeminarSelectProps {
	value: string
	seminars: { _id: string; title: string }[]
	error?: string
	touched: boolean
	onChange: (value: string) => void
	onFocus: () => void
	disabled?: boolean
	placeholder: string
	label: string
}

export const SeminarSelect: React.FC<SeminarSelectProps> = ({
	value,
	seminars,
	error,
	touched,
	onChange,
	onFocus,
	disabled,
	placeholder,
	label,
}) => {
	return (
		<FieldWrapper sx={{ mt: 2 }}>
			<span
				style={{
					marginLeft: 22,

					fontSize: 12,
					fontWeight: 600,
				}}
			>
				{label}
			</span>
			<FieldLabel>
				<Required>*</Required>
			</FieldLabel>

			<InputBlock>
				<ValidationIcon>{error ? <No /> : touched && <Yes />}</ValidationIcon>
				<Select
					value={value}
					onChange={e => onChange(e.target.value)}
					onFocus={onFocus}
					disabled={disabled}
				>
					<option value=''>{placeholder}</option>
					{seminars.map(s => (
						<option key={s._id} value={s._id}>
							{s.title}
						</option>
					))}
				</Select>
			</InputBlock>
			<StyledError>{error || ''}</StyledError>
		</FieldWrapper>
	)
}

//===============================================

interface TextInputProps {
	type: string
	value: string
	error?: string
	touched: boolean
	placeholder: string
	onChange: (value: string) => void
	onFocus: () => void
}

export const TextInput: React.FC<TextInputProps> = ({
	type,
	value,
	error,
	touched,
	placeholder,
	onChange,
	onFocus,
}) => {
	return (
		<FieldWrapper>
			<FieldLabel>
				<Required>*</Required>
			</FieldLabel>
			<InputBlock>
				<ValidationIcon>{error ? <No /> : touched && <Yes />}</ValidationIcon>

				<Input
					type={type}
					value={value}
					placeholder={placeholder}
					onChange={e => onChange(e.target.value)}
					onFocus={onFocus}
				/>
			</InputBlock>
			<StyledError>{error || ''}</StyledError>
		</FieldWrapper>
	)
}

//=======================//==========================//
const Input = styled('input')(({ theme }) => ({
	padding: 6,
	border: `1px solid ${theme.palette.primary.main}`,
	borderRadius: 6,
	fontSize: 14,
	width: '100%',
	backgroundColor: theme.palette.background.default,
}))

const Select = styled('select')(({ theme }) => ({
	padding: 8,
	border: '1px solid #ccc',
	borderRadius: 4,
	fontSize: 14,
	color: '#6C6D6F',
	borderColor: theme.palette.primary.main,
	width: '100%',
	backgroundColor: theme.palette.background.default,
}))

const StyledError = styled('span')({
	color: 'red',
	fontSize: 12,
	minHeight: '1.2em',
	marginLeft: 24,
})

const FieldWrapper = styled('div')({
	display: 'flex',
	flexDirection: 'column',
})

const FieldLabel = styled('label')({
	fontSize: 12,
	fontWeight: 600,
	marginBottom: '-8px',
})

const Required = styled('span')({
	color: 'red',
	marginLeft: 18,
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
