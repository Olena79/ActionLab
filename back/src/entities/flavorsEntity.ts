import { IFlavor } from '../models/flavorModel'

class FlavorEntity {
  _id: string
  type: string
  nameUA: string
  nameEN: string
  flavors: { flavorUA: string; flavorEN: string }[]

  constructor(data: IFlavor) {
    this._id = data._id.toString()
    this.type = data.type
    this.nameUA = data.nameUA
    this.nameEN = data.nameEN
    this.flavors = data.flavors
  }

  toResponse(lang: 'UA' | 'EN') {
    return {
      _id: this._id,
      type: this.type,
      name: this[`name${lang}`],
      flavors: this.flavors.map((flavor) => ({
        flavor: flavor[`flavor${lang}`],
      })),
    }
  }
}

export default FlavorEntity
