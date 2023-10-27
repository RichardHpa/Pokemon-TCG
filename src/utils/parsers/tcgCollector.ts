import { proxyServerUrl } from 'constants/api'
import { binderPosUrl } from './binderPos'

import type { Card } from 'types/fixtures/card'

export const parseTcgCollectorsUrl = (card: Card) => {
  let string = proxyServerUrl
  string += 'https://tcgcollectornz.com/products/'
  string += binderPosUrl(card)

  return [string]
}
