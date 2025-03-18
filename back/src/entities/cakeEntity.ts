import { ICake } from '../models/cakeModel'

export class CakeEntity {
  _id: string
  img: string
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

  constructor(cake: ICake, lang: 'UA' | 'EN') {
    this._id = cake._id.toString()
    this.img = cake.img
    this.cakeNameUA = cake.cakeNameUA
    this.cakeNameEN = cake.cakeNameEN
    this.doughUA = cake.doughUA
    this.doughEN = cake.doughEN
    this.creamUA = cake.creamUA
    this.creamEN = cake.creamEN
    this.layerUA = cake.layerUA
    this.layerEN = cake.layerEN
    this.toppingUA = cake.toppingUA
    this.toppingEN = cake.toppingEN
    this.decorUA = cake.decorUA
    this.decorEN = cake.decorEN
    this.descriptionUA = cake.descriptionUA
    this.descriptionEN = cake.descriptionEN
  }
}
