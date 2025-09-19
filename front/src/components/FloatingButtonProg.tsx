import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material'
import ButtonOutlined from './ButtonOutlined'
import { useTranslation } from '../translation/TranslationContext'

const FloatingButtonProg = () => {
	const { t } = useTranslation()
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(true)
		}, 7000) // 5 секунд
		return () => clearTimeout(timer)
	}, [])

	if (!visible) return null

	return (
		<Wrapper>
			<ButtonOutlined
				sx={{ backgroundColor: '#ffffffc1' }}
				text={t('program.linkText')}
				pass='/program'
			/>
		</Wrapper>
	)
}

export default FloatingButtonProg

// ===================== STYLES =====================
const Wrapper = styled('div')(() => ({
	position: 'fixed',
	bottom: 26,
	left: 10,
	zIndex: 9999,
	transition: 'transform 1s ease',
	boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
	borderRadius: '24px',
}))
