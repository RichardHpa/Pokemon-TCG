import { proxyServerUrl } from 'constants/api'
import { binderPosUrl } from './binderPos'

import type { Card } from 'types/fixtures/card'

export const parseGoblinGames = (card: Card) => {
  let string = proxyServerUrl
  string += 'https://goblingames.nz/products/'
  string += binderPosUrl(card)

  return [string]
}
