import React from 'react'
import { Box, Typography, Modal, styled } from '@mui/material'
import ButtonOutlined from './ButtonOutlined'
import { useTranslation } from '../translation/TranslationContext'
import ButtonContained from './ButtonContained'

interface ConfirmationModalProps {
	open: boolean
	title: string
	message1: string
	message2: string
	onClose: () => void
	onPay?: () => void // викликається для кнопки "Сплатити"
	showPayButton?: boolean // показати кнопку "Сплатити"
}

const ConfirmModal: React.FC<ConfirmationModalProps> = ({
	open,
	title,
	message1,
	message2,
	onClose,
	onPay,
	showPayButton = false,
}) => {
	const { t } = useTranslation()

	return (
		<Modal open={open} onClose={onClose}>
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
				<CloseButton type='button' onClick={() => onClose?.()}>
					×
				</CloseButton>
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
								onClick={onClose}
							/>
							<ButtonContained text={t('payment.payBtn')} onClick={onPay} />
						</>
					)}
				</Box>
			</Box>
		</Modal>
	)
}

export default ConfirmModal

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
