import React from 'react'
import ButtonContained from '../ButtonContained'
import { useTranslation } from '../../translation/TranslationContext'

const RegisterBtn: React.FC = () => {
	const { t } = useTranslation()

	return (
		<ButtonContained
			text={t('join')}
			type='button'
			pass='/program'
		></ButtonContained>
	)
}

export default RegisterBtn

//======================//=======================//
