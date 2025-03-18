import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:5000',
})

export const fetchCakes = async (lang: 'UA' | 'EN') => {
	const response = await api.get(
		`/api/classic_cakes?fields=img,cakeName${lang},description${lang}`
	)
	return response.data
}

export const fetchCakeById = async (_id: string, lang: 'UA' | 'EN') => {
	const response = await api.get(
		`/api/classic_cakes/${_id}?fields=_id,img,cakeName${lang},dough${lang},cream${lang},layer${lang},topping${lang},decor${lang},description${lang}`
	)
	return response.data
}
