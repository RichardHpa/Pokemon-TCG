import { Link } from 'react-router-dom'

import type { Card as CardProps } from 'types/fixtures/card'

export const SingleCardThumbnail = ({ card }: { card: CardProps }) => {
  return (
    <Link to={`/sets/${card.set.id}/${card.id}`}>
      <img src={card.images.small} alt={card.name} />
    </Link>
  )
}
