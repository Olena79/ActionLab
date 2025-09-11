import React, { createContext, useContext, useState } from 'react'
import ua from './ua.json'
import en from './en.json'

// Типи мов та контексту
export type LanguageCode = 'ua' | 'en'

interface TranslationContextType {
	lang: LanguageCode
	t: (key: string) => string
	changeLanguage: (lang: LanguageCode) => void
}

// Ініціалізація контексту
const TranslationContext = createContext<TranslationContextType | undefined>(
	undefined
)

const getLanguage = (): LanguageCode => {
	return (localStorage.getItem('language') as LanguageCode) || 'ua'
}

// Статичне завантаження перекладів
const translations: Record<LanguageCode, Record<string, any>> = {
	ua: ua,
	en: en,
}

// 🔧 Глибоке отримання значення з вкладеного обʼєкта
const getNestedValue = (obj: Record<string, any>, path: string): string => {
	const result = path.split('.').reduce((acc, key) => {
		if (acc && typeof acc === 'object') return acc[key]
		return undefined
	}, obj)

	return typeof result === 'string' ? result : path
}

// Провайдер перекладів
export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [lang, setLang] = useState<LanguageCode>(getLanguage())
	const [currentTranslations, setCurrentTranslations] = useState<
		Record<string, any>
	>(translations[getLanguage()])

	const changeLanguage = (newLang: LanguageCode) => {
		localStorage.setItem('language', newLang)
		setLang(newLang)
		setCurrentTranslations(translations[newLang] || translations.ua)
	}

	const t = (key: string) => getNestedValue(currentTranslations, key)

	return (
		<TranslationContext.Provider value={{ lang, t, changeLanguage }}>
			{children}
		</TranslationContext.Provider>
	)
}

// Хук для доступу до контексту
export const useTranslation = (): TranslationContextType => {
	const context = useContext(TranslationContext)
	if (!context) {
		throw new Error('useTranslation must be used within a TranslationProvider')
	}
	return context
}

// Хук з неймспейсом
export const useTranslate = (namespace?: string) => {
	const { t } = useTranslation()
	return (key: string) => t(namespace ? `${namespace}.${key}` : key)
}
