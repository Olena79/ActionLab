import mongoose, { Schema, Document } from 'mongoose'

export interface ICake extends Document {
  _id: string
  img: string
  cakeName: string
  cakeNameUA: string
  cakeNameEN: string
  doughUA: string
  doughEN: string
  creamUA: string
  creamEN: string
  layerUA?: string
  layerEN?: string
  toppingUA?: string
  toppingEN?: string
  decorUA?: string
  decorEN?: string
  descriptionUA: string
  descriptionEN: string
}

const CakeSchema: Schema = new Schema(
  {
    img: { type: String, required: true },
    cakeNameUA: { type: String, required: true },
    cakeNameEN: { type: String, required: true },
    doughUA: { type: String, required: true },
    doughEN: { type: String, required: true },
    creamUA: { type: String, required: true },
    creamEN: { type: String, required: true },
    layerUA: { type: String },
    layerEN: { type: String },
    toppingUA: { type: String },
    toppingEN: { type: String },
    decorUA: { type: String },
    decorEN: { type: String },
    descriptionUA: { type: String, required: true },
    descriptionEN: { type: String, required: true },
  },
  { timestamps: true, collection: 'classic_cakes' },
)

export default mongoose.model<ICake>('Cake', CakeSchema)
