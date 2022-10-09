import type { Set } from './set'
import type { Attack, Legalities, Prices, Effects, Abilities } from '../cardInfo'

export interface Card {
  id: string
  name: string
  supertype: string
  subtypes: string[]
  level?: string
  hp: string
  types: string[]
  evolvesTo?: string[]
  evolvesFrom?: string
  abilities?: Abilities[]
  attacks: Attack[]
  weaknesses?: Effects[]
  resistances?: Effects[]
  retreatCost?: string[]
  convertedRetreatCost?: number
  set: Set
  number: string
  artist: string
  rarity: string
  flavorText?: string
  nationalPokedexNumbers: number[]
  legalities: Legalities
  images: {
    small: string
    large: string
  }
  tcgplayer: {
    url: string
    updatedAt: string
    prices: {
      normal?: Prices
      holofoil?: Prices
      reverseHolofoil?: Prices
    }
  }
  cardmarket: {
    url: string
    updatedAt: string
    prices: {
      averageSellPrice: number
      lowPrice: number
      trendPrice: number
      reverseHoloSell: number
      reverseHoloLow: number
      reverseHoloTrend: number
      lowPriceExPlus: number
      avg1: number
      avg7: number
      avg30: number
      reverseHoloAvg1: number
      reverseHoloAvg7: number
      reverseHoloAvg30: number
    }
  }
}
