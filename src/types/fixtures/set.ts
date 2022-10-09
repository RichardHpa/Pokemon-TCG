import { Legalities } from 'types/cardInfo'

export interface Set {
  id: string
  name: string
  series: string
  printedTotal: number
  total: number
  legalities: Legalities
  ptcgoCode: string
  releaseDate: string
  updatedAt: string
  images: {
    symbol: string
    logo: string
  }
}
