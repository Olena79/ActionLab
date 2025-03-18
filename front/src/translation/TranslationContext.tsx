import React, { createContext, useContext, useState } from 'react'
import ua from './ua.json'
import en from './en.json'

// Типи мов та контексту
type LanguageCode = 'UA' | 'EN'

interface TranslationContextType {
	lang: LanguageCode
	t: (key: string) => string
	changeLanguage: (lang: LanguageCode) => void
}

// Ініціалізація контексту
const TranslationContext = createContext<TranslationContextType | undefined>(
	undefined
)

// Функція отримання мови
const getLanguage = (): LanguageCode => {
	return (localStorage.getItem('language') as LanguageCode) || 'UA'
}

// Статичне завантаження перекладів
const translations: Record<LanguageCode, Record<string, string>> = {
	UA: ua,
	EN: en,
}

const loadTranslation = (lang: LanguageCode): Record<string, string> => {
	return translations[lang] || translations.UA
}

// Провайдер перекладів
export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [lang, setLang] = useState<LanguageCode>(getLanguage())
	const [translations, setTranslations] = useState<Record<string, string>>(
		loadTranslation(getLanguage())
	)

	// Функція зміни мови
	const changeLanguage = (newLang: LanguageCode) => {
		localStorage.setItem('language', newLang)
		setLang(newLang)
		setTranslations(loadTranslation(newLang))
	}

	// Функція `t()` для отримання перекладу
	const t = (key: string) => translations[key] || key

	return (
		<TranslationContext.Provider value={{ lang, t, changeLanguage }}>
			{children}
		</TranslationContext.Provider>
	)
}

// Хук для отримання перекладів
export const useTranslation = (): TranslationContextType => {
	const context = useContext(TranslationContext)
	if (!context) {
		throw new Error('useTranslation must be used within a TranslationProvider')
	}
	return context
}

// Хук `useTranslate`
export const useTranslate = (namespace?: string) => {
	const { t } = useTranslation()
	return (key: string) => t(namespace ? `${namespace}.${key}` : key)
}
