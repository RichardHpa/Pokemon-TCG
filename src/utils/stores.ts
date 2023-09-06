import { parseGetThoseMonsUrl } from './parsers/getThoseMons'
import { parseTcgCollectorsUrl } from './parsers/tcgCollector'
import { parseGoblinGames } from './parsers/goblinGames'

import type { Card } from 'types/fixtures/card'

interface StoreProps {
  name: string
  url: string
  parser: (card: Card) => string[] | string
  soldOutEl: string
  priceEl: string
}

interface Stores {
  [key: string]: StoreProps
}

export const stores: Stores = {
  getthosemons: {
    name: 'GetThoseMons',
    url: 'https://getthosemons.co.nz/',
    parser: parseGetThoseMonsUrl,
    soldOutEl: '.alertBox--error',
    priceEl: '.productView-details .price.price--withTax',
  },
  tcgcollectornz: {
    name: 'TCG Collector',
    url: 'https://tcgcollectornz.com/',
    parser: parseTcgCollectorsUrl,
    soldOutEl: '.sold-msg',
    priceEl: '.product-single__meta .price-product',
  },
  goblingames: {
    name: 'Goblin Games',
    url: 'https://goblingames.nz/',
    parser: parseGoblinGames,
    soldOutEl: '.product-single__meta .product-soldout',
    priceEl: '.product-single__meta .product-single__price',
  },
}

export const storesList = Object.keys(stores)
