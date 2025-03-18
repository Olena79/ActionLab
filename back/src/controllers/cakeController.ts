import { NextFunction, Request, Response } from 'express'
import CakeModel from './../models/cakeModel'
import { CakeEntity } from './../entities/cakeEntity'

export const getCakes = async (
  req: Request,
  res: Response,
) => {
  try {
    const lang = (req.query.lang as 'UA' | 'EN') || 'UA'
    const fields = req.query.fields
      ? (req.query.fields as string).split(',')
      : [
          '_id',
          'img',
          `cakeName${lang}`,
          `description${lang}`,
        ]

    const cakes = await CakeModel.find().select(
      fields.join(' '),
    )

    const transformedCakes = cakes.map(
      (cake) => new CakeEntity(cake.toObject(), lang),
    )
    res.json(transformedCakes)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const getCakeById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id } = req.params
    const lang = (req.query.lang as 'UA' | 'EN') || 'UA'
    const fields = req.query.fields
      ? (req.query.fields as string).split(',')
      : [
          'img',
          `cakeName${lang}`,
          `description${lang}`,
          `dough${lang}`,
          `cream${lang}`,
          `layer${lang}`,
          `topping${lang}`,
          `decor${lang}`,
        ]
    console.log('Мої філди: ', fields)

    const cake = await CakeModel.findById(_id).select(
      fields.join(' '),
    )

    if (!cake) {
      res.status(404).json({ message: 'Cake not found' })
      return
    }

    console.log('Мій кейк: ', cake)

    const transformedCake = new CakeEntity(
      cake.toObject(),
      lang,
    )
    console.log('Моя відповідь: ', transformedCake)

    res.json(transformedCake)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
