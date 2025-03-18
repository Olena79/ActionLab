import mongoose, { Schema, Document } from 'mongoose'

interface IVariation {
  variationUA: string
  variationEN: string
}

export interface IIngredient extends Document {
  _id: string
  type: string
  nameUA: string
  nameEN: string
  variations: IVariation[]
}

const IngredientSchema: Schema = new Schema(
  {
    _id: { type: String, required: true },
    type: { type: String, required: true },
    nameUA: { type: String, required: true },
    nameEN: { type: String, required: true },
    variations: [
      {
        variationUA: { type: String, required: true },
        variationEN: { type: String, required: true },
      },
    ],
  },
  { timestamps: true, collection: 'ingridients' },
)

export default mongoose.model<IIngredient>(
  'Ingredient',
  IngredientSchema,
)
