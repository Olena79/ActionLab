import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react'

// Тип ролей
export type Role = 'user' | 'coach' | 'admin'

// Тип користувача
export interface AuthUser {
	id: string
	email: string
	name: string
	role: Role
	verified: boolean
	avatarUrl?: string
}

// Тип контексту
interface AuthContextType {
	user: AuthUser | null
	accessToken: string | null
	refreshToken: string | null
	isAuthenticated: boolean
	login: (
		userData: AuthUser,
		accessToken?: string,
		refreshToken?: string
	) => void
	logout: () => void
	setTokens: (accessToken: string, refreshToken?: string) => void
}

// Початкове значення контексту
const AuthContext = createContext<AuthContextType>({
	user: null,
	accessToken: null,
	refreshToken: null,
	isAuthenticated: false,
	login: () => {},
	logout: () => {},
	setTokens: () => {},
})

// Провайдер
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<AuthUser | null>(null)
	const [accessToken, setAccessToken] = useState<string | null>(null)
	const [refreshToken, setRefreshToken] = useState<string | null>(null)

	// Підтримка localStorage
	useEffect(() => {
		const storedUser = localStorage.getItem('authUser')
		const storedAccessToken = localStorage.getItem('accessToken')
		const storedRefreshToken = localStorage.getItem('refreshToken')

		if (storedUser) {
			setUser(JSON.parse(storedUser))
		}
		if (storedAccessToken) {
			setAccessToken(storedAccessToken)
		}
		if (storedRefreshToken) {
			setRefreshToken(storedRefreshToken)
		}
	}, [])

	const login = (
		userData: AuthUser,
		accessToken?: string,
		refreshToken?: string
	) => {
		setUser(userData)
		localStorage.setItem('authUser', JSON.stringify(userData))
		if (accessToken) {
			setAccessToken(accessToken)
			localStorage.setItem('accessToken', accessToken)
		}
		if (refreshToken) {
			setRefreshToken(refreshToken)
			localStorage.setItem('refreshToken', refreshToken)
		}
	}

	const setTokens = (accessToken: string, refreshToken?: string) => {
		setAccessToken(accessToken)
		localStorage.setItem('accessToken', accessToken)

		if (refreshToken) {
			setRefreshToken(refreshToken)
			localStorage.setItem('refreshToken', refreshToken)
		}
	}

	const logout = () => {
		setUser(null)
		setAccessToken(null)
		setRefreshToken(null)
		localStorage.removeItem('authUser')
		localStorage.removeItem('accessToken')
		localStorage.removeItem('refreshToken')
	}

	const value: AuthContextType = {
		user,
		accessToken,
		refreshToken,
		isAuthenticated: !!user,
		login,
		logout,
		setTokens,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Хук для зручного доступу
export const useAuth = () => useContext(AuthContext)
