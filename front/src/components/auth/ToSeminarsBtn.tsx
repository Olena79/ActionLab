import React from 'react'
import ButtonContained from '../ButtonContained'
import { useTranslation } from '../../translation/TranslationContext'
interface RegisterBtnProps {
	isMobile?: boolean
	text?: string
	icon?: string
}

const RegisterBtn: React.FC<RegisterBtnProps> = ({ isMobile, text, icon }) => {
	const { t } = useTranslation()

	return (
		<ButtonContained
			text={text ? text : t('join')}
			type='button'
			pass='/program'
			sx={{ fontSize: isMobile ? 12 : 16 }}
			icon={icon}
		></ButtonContained>
	)
}

export default RegisterBtn

//======================//=======================//
