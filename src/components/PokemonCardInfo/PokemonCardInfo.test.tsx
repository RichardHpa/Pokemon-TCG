import { screen, render } from '@testing-library/react'

import { PokemonCardInfo } from './PokemonCardInfo'

import { cards } from 'fixtures/cards'

describe('PokemonCardInfo', () => {
  test('should render the PokemonCardInfo component', () => {
    render(<PokemonCardInfo card={cards[1]} />)
    expect(screen.getByText('Aerodactyl (Rare Holo)')).toBeInTheDocument()
  })

  test('should render the PokemonCardInfo component with the correct image', () => {
    render(<PokemonCardInfo card={cards[1]} />)
    expect(screen.getByAltText('Aerodactyl')).toBeInTheDocument()
  })

  test('should render the PokemonCardInfo component with the correct subtypes', () => {
    render(<PokemonCardInfo card={cards[1]} />)
    expect(screen.getByText('Stage 1')).toBeInTheDocument()
  })

  test('should render the PokemonCardInfo component with the correct flavor text', () => {
    render(<PokemonCardInfo card={cards[2]} />)
    expect(
      screen.getByText(
        'Its poison stinger is very powerful. Its bright-colored body is intended to warn off its enemies.',
      ),
    ).toBeInTheDocument()
  })

  test('should show loading state', () => {
    render(<PokemonCardInfo loading />)
    expect(screen.getByLabelText('loading card image')).toBeInTheDocument()
  })
})
