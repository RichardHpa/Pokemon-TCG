import type { Card } from 'types/fixtures/card'

// Quite a few stores use BinderPos as their initial CMS so their urls are the same across stores
export const binderPosUrl = (card: Card) => {
  const idParts = card.id.split('-')
  const secondPart = idParts[1].padStart(3, '0')

  let string = ''
  string += `${card.name.replace(/\s/g, '-')}-`
  string += `${secondPart}-`
  string += `${card.set.printedTotal.toString().padStart(3, '0')}`
  string += `-${card.set.series.replace('&', '-').replace(/ /g, '')}`
  string += `-${card.set.name.replace(' ', '-')}`

  return string
}
