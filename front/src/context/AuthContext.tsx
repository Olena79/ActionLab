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
	isAuthenticated: boolean
	login: (userData: AuthUser) => void
	logout: () => void
}

// Початкове значення контексту
const AuthContext = createContext<AuthContextType>({
	user: null,
	isAuthenticated: false,
	login: () => {},
	logout: () => {},
})

// Провайдер
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<AuthUser | null>(null)

	// Підтримка localStorage (можна забрати)
	useEffect(() => {
		const stored = localStorage.getItem('authUser')
		if (stored) {
			setUser(JSON.parse(stored))
		}
	}, [])

	const login = (userData: AuthUser) => {
		setUser(userData)
		localStorage.setItem('authUser', JSON.stringify(userData))
	}

	const logout = () => {
		setUser(null)
		localStorage.removeItem('authUser')
	}

	const value: AuthContextType = {
		user,
		isAuthenticated: !!user,
		login,
		logout,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Хук для зручного доступу
export const useAuth = () => useContext(AuthContext)
