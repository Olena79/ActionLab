import React from 'react'
import ButtonContained from '../ButtonContained'
import { useTranslation } from '../../translation/TranslationContext'
interface RegisterBtnProps {
	isMobile?: boolean
}

const RegisterBtn: React.FC<RegisterBtnProps> = ({ isMobile }) => {
	const { t } = useTranslation()

	return (
		<ButtonContained
			text={t('join')}
			type='button'
			pass='/program'
			sx={{ fontSize: isMobile ? 12 : 16 }}
		></ButtonContained>
	)
}

export default RegisterBtn

//======================//=======================//
