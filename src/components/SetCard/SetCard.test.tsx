import { render, screen } from '@testing-library/react'

import { set } from 'fixtures/sets'

import { SetCard } from './SetCard'

const props = {
  name: set.name,
  releaseDate: set.releaseDate,
  series: set.series,
  total: set.total,
  printedTotal: set.printedTotal,
  image: set.images.logo,
}

describe('SetCard', () => {
  test('renders SetCard', () => {
    render(<SetCard {...props} />)
    expect(screen.getByText(set.name)).toBeInTheDocument()
    expect(screen.getByText(`${set.series} - ${set.releaseDate}`)).toBeInTheDocument()
    expect(screen.getByText(`${set.total} cards`)).toBeInTheDocument()
  })

  test('renders SetCard snapshot', () => {
    const { container } = render(<SetCard {...props} />)
    expect(container).toMatchSnapshot()
  })
})
