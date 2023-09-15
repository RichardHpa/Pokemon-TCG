import { render, screen } from 'tests/renderHelpers'

import { card } from 'fixtures/cards'

import { SingleCardThumbnail } from './SingleCardThumbnail'

describe('SingleCardThumbnail', () => {
  test('renders SingleCardThumbnail', () => {
    render(<SingleCardThumbnail card={card} />)

    expect(screen.getByRole('img')).toBeInTheDocument()
    const link = screen.getByRole('link', { name: 'Absol G' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/sets/pl3/pl3-1')
  })
})
