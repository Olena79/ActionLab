import { IIngredient } from '../models/ingridientModel'

class IngridientEntity {
  id: string
  type: string
  name: string
  variations: { variation: string }[]

  constructor(ingredient: IIngredient, lang: 'UA' | 'EN') {
    this.id = ingredient._id.toString()
    this.type = ingredient.type
    this.name = ingredient[`name${lang}`]

    this.variations = ingredient.variations.map(
      (variation) => ({
        variation: variation[`variation${lang}`],
      }),
    )
  }
}

export default IngridientEntity
