import type { Card } from 'types/fixtures/card'

import { proxyServerUrl } from 'constants/api'

export const parseTcgCollectorsUrl = (card: Card) => {
  const idParts = card.id.split('-')
  const secondPart = idParts[1].padStart(3, '0')

  let string = proxyServerUrl
  string += 'https://tcgcollectornz.com/products/'
  string += `${card.name.replace(/\s/g, '-')}-`
  string += `${secondPart}-${card.set.printedTotal}`
  string += `-${card.set.series.replace('&', '-').replace(/ /g, '')}`
  string += `-${card.set.name.replace(' ', '-')}`

  return [string]
}
