import { Request, Response } from 'express'
import { FlavorModel } from './../models/flavorModel'
import FlavorEntity from '../entities/flavorsEntity'

export const getFlavors = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { lang } = req.query

    if (lang !== 'UA' && lang !== 'EN') {
      res.status(400).json({ message: 'Invalid language' })
      return
    }

    const flavors = await FlavorModel.find()

    const result = flavors.map((flavor) =>
      new FlavorEntity(flavor).toResponse(lang),
    )

    res.json(result)
    return
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
    return
  }
}
