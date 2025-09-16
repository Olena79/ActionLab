import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material'
import RegisterBtn from '../components/auth/RegisterBtn'

const FloatingButton = () => {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(true)
		}, 5000) // 5 секунд
		return () => clearTimeout(timer)
	}, [])

	if (!visible) return null

	return (
		<Wrapper>
			<RegisterBtn />
		</Wrapper>
	)
}

export default FloatingButton

// ===================== STYLES =====================
const Wrapper = styled('div')(() => ({
	position: 'fixed',
	bottom: 26,
	right: 10,
	zIndex: 9999,
	transition: 'transform 1s ease',
	boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
	borderRadius: '24px',
}))
