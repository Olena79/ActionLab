import { Request, Response } from 'express'
import IngredientModel from '../models/ingridientModel'
import ingridientEntity from './../entities/ingridientEntity'

export const getIngredients = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const lang = (req.query.lang as 'UA' | 'EN') || 'UA'
    const type = req.query.type as string

    if (!type) {
      res.status(400).json({ message: 'Type is required' })
      return
    }

    const ingredient = await IngredientModel.findOne({
      type,
    })
      .select(`_id type name${lang} variations`)
      .lean()

    if (!ingredient) {
      console.log('Dough not found')
      res.status(404).json({ message: 'Dough not found' })
      return
    }

    const transformedIngredient = new ingridientEntity(
      ingredient,
      lang,
    )

    res.json(transformedIngredient)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
