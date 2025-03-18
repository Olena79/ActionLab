import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:5000',
})

export const fetchIngredient = async (
	type: 'dough' | 'cream' | 'layers' | 'topping',
	lang: 'UA' | 'EN'
) => {
	const response = await api.get(`/api/ingredients?type=${type}&lang=${lang}`)
	return response.data
}

export const fetchFlavors = async (lang: 'UA' | 'EN') => {
	const response = await api.get(`/api/flavors?lang=${lang}`)
	return response.data
}
