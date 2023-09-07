import { proxyServerUrl } from 'constants/api'

import { generateSetId } from '../generateSetId'

import type { Card } from 'types/fixtures/card'

const rarityMap = {
  normal: undefined,
  reverseHolofoil: 'reverse-holo',
}

// NOTES: getThoseMons lists items rarity separate, so there might be a few different urls
export const parseGetThoseMonsUrl = (card: Card) => {
  const variants = Object.keys(card.tcgplayer.prices)

  const idParts = card.id.split('-')
  const firstPart = generateSetId(idParts[0])
  const secondPart = idParts[1].padStart(3, '0')

  const urls: string[] = []
  variants.forEach((variant) => {
    // start with set version and card number
    let string = proxyServerUrl
    string += `https://getthosemons.co.nz/${firstPart}-${secondPart}`
    // add total printed cards
    string += `-${card.set.printedTotal}`
    // add the name
    string += `-${card.name.replace(/\s/g, '-')}`
    // check the rarity
    if (rarityMap[variant] !== undefined) {
      string += `-${rarityMap[variant]}`
    }
    urls.push(string)
  })

  return urls
}
