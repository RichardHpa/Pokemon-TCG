import { render, screen } from '@testing-library/react'

import { set } from 'fixtures/sets'

import { SetCard } from './SetCard'

const rares = set.total - set.printedTotal

describe('SetCard', () => {
  test('renders SetCard', () => {
    render(<SetCard {...set} />)
    expect(screen.getByText(set.name)).toBeInTheDocument()
    expect(screen.getByText(`${set.series} - ${set.releaseDate}`)).toBeInTheDocument()
    expect(screen.getByText(`${set.total} Cards (${rares} Secret Cards)`)).toBeInTheDocument()
  })

  test('renders SetCard snapshot', () => {
    const { container } = render(<SetCard {...set} />)
    expect(container).toMatchSnapshot()
  })
})
