import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	useRef,
	useCallback,
} from 'react'

interface Cake {
	_id: string
	img: string
	[key: string]: string
}

export interface Ingredients {
	dough?: string
	doughFlavor?: string
	cream?: string
	creamFlavor?: string
	extraDough?: string
	extraDoughFlavor?: string
	extraCream?: string
	extraCreamFlavor?: string
	layer1?: string
	layer2?: string
	layer3?: string
	topping?: string
	toppingCream?: string
	toppingCreamFlavor?: string
}

interface CakeSelectionContextType {
	mode: 'classic' | 'custom'
	setMode: (mode: 'classic' | 'custom') => void
	selectedCake: Cake | null
	setSelectedCake: (cake: Cake | null) => void
	ingredients: Ingredients
	setIngredients: (
		update: Ingredients | ((prev: Ingredients) => Ingredients)
	) => void
}

const CakeSelectionContext = createContext<
	CakeSelectionContextType | undefined
>(undefined)

export const CakeSelectionProvider = ({
	children,
}: {
	children: ReactNode
}) => {
	const initialMode =
		(sessionStorage.getItem('mode') as 'classic' | 'custom') || 'classic'
	const [mode, setModeState] = useState<'classic' | 'custom'>(initialMode)

	const [selectedCake, setSelectedCakeState] = useState<Cake | null>(
		sessionStorage.getItem('selectedCake')
			? JSON.parse(sessionStorage.getItem('selectedCake')!)
			: null
	)
	const [ingredients, setIngredientsState] = useState<Ingredients>(() => {
		const storedIngredients = sessionStorage.getItem('ingredients')
		return storedIngredients ? JSON.parse(storedIngredients) : {}
	})
	const setIngredients = useCallback(
		(update: Ingredients | ((prev: Ingredients) => Ingredients)) => {
			setIngredientsState(prev => {
				const newIngredients =
					typeof update === 'function' ? update(prev) : update

				return newIngredients
			})
		},
		[]
	)

	useEffect(() => {
		if (mode === 'custom') {
			setIngredientsState({})
		} else {
			setSelectedCakeState(null)
		}
		sessionStorage.setItem('mode', mode)
	}, [mode])

	useEffect(() => {
		if (selectedCake) {
			sessionStorage.setItem('selectedCake', JSON.stringify(selectedCake))
		} else {
			sessionStorage.removeItem('selectedCake')
		}
	}, [selectedCake])

	const prevIngredientsRef = useRef<Ingredients | null>(null)

	useEffect(() => {
		if (
			JSON.stringify(prevIngredientsRef.current) !== JSON.stringify(ingredients)
		) {
			sessionStorage.setItem('ingredients', JSON.stringify(ingredients))
			prevIngredientsRef.current = { ...ingredients }
		}
	}, [ingredients])

	const setMode = (newMode: 'classic' | 'custom') => {
		setModeState(newMode)
		sessionStorage.setItem('mode', newMode)
	}

	return (
		<CakeSelectionContext.Provider
			value={{
				mode,
				setMode,
				selectedCake,
				setSelectedCake: setSelectedCakeState,
				ingredients,
				setIngredients,
			}}
		>
			{children}
		</CakeSelectionContext.Provider>
	)
}

export const useCakeSelection = () => {
	const context = useContext(CakeSelectionContext)
	if (!context) {
		throw new Error(
			'useCakeSelection must be used within a CakeSelectionProvider'
		)
	}
	return context
}
