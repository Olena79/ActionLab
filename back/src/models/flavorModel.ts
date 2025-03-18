import { Schema, model } from 'mongoose'

interface IVariation {
  flavorUA: string
  flavorEN: string
}

export interface IFlavor {
  _id: string
  type: string
  nameUA: string
  nameEN: string
  flavors: IVariation[]
}

const FlavorSchema = new Schema<IFlavor>(
  {
    type: { type: String, required: true, unique: true },
    nameUA: { type: String, required: true },
    nameEN: { type: String, required: true },
    flavors: [
      {
        flavorUA: { type: String, required: true },
        flavorEN: { type: String, required: true },
      },
    ],
  },
  { timestamps: true, collection: 'flavors' },
)

export const FlavorModel = model<IFlavor>(
  'DoughFlavor',
  FlavorSchema,
)
