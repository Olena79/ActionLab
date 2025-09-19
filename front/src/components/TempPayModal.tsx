import React, { useEffect, useState } from 'react'
import { Box, Typography, Modal, styled } from '@mui/material'
import ButtonOutlined from './ButtonOutlined'
import { sendTempPaymentEmail } from '../actions/monobank'

interface TempPayModalProps {
	open: boolean
	title: string
	title2: string
	subTitle2: string
	title3: string
	title4: string
	message1: string
	message2: string
	onClose: () => void
	userData: {
		firstName: string
		lastName: string
		phone: string
		email: string
	}
	seminarData: {
		title: string
		date: string
	}
}

const TempPayModal: React.FC<TempPayModalProps> = ({
	open,
	title,
	title2,
	subTitle2,
	title3,
	title4,
	message1,
	message2,
	onClose,
	userData,
	seminarData,
}) => {
	const [loading, setLoading] = useState(false)

	// ⬇️ Відправка листа відразу при відкритті модалки
	useEffect(() => {
		const sendEmail = async () => {
			if (!open) return
			try {
				setLoading(true)
				await sendTempPaymentEmail({
					userData,
					seminarData,
				})
			} catch (err) {
				console.error('❌ Помилка при тимчасовій оплаті:', err)
			} finally {
				setLoading(false)
			}
		}
		sendEmail()
	}, [open, userData, seminarData])
	return (
		<Modal open={open} onClose={onClose}>
			<StyledBox
				sx={{
					boxShadow: 24,
				}}
			>
				<CloseButton type='button' onClick={() => onClose?.()}>
					×
				</CloseButton>
				<Typography sx={{ fontWeight: 600 }} variant='subtitle1' mb={2}>
					{title}
				</Typography>
				<Typography variant='body2' mb={1}>
					{message1}
				</Typography>
				<Typography sx={{ fontWeight: 600 }} variant='body2'>
					{title2}
				</Typography>
				<Typography sx={{ fontWeight: 600 }} variant='subtitle1' mb={2}>
					{subTitle2}
				</Typography>
				<Typography sx={{ fontWeight: 600 }} variant='subtitle2' mb={2}>
					{title3}
				</Typography>
				<Typography variant='body2' mb={3}>
					{message2}
				</Typography>

				<Typography variant='subtitle1' mb={2}>
					{title4}
				</Typography>

				<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
					<ButtonOutlined
						sx={{ color: '#6C6D6F', backgroundColor: '#F5DD47' }}
						text='Ok'
						onClick={onClose}
						disabled={loading}
					/>
				</Box>
			</StyledBox>
		</Modal>
	)
}

export default TempPayModal

//=================================================

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

const StyledBox = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 316,
	color: theme.palette.primary.main,
	backgroundColor: theme.palette.background.paper,
	backgroundImage:
		'url(https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758283523/xfvnjytjyj_hb2ypk.png)',
	backgroundSize: 'contain',
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	borderRadius: 8,
	padding: 16,
	textAlign: 'center',
}))
