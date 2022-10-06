import { render, screen } from '@testing-library/react'

import { set } from 'fixtures/sets'

import { SetCard } from './SetCard'

const props = {
  name: set.name,
  releaseDate: set.releaseDate,
  series: set.series,
  image: set.images.logo,
}

describe('SetCard', () => {
  test('renders SetCard', () => {
    render(<SetCard {...props} />)
    expect(screen.getByText(set.name)).toBeInTheDocument()
    expect(screen.getByText(`${set.series} - ${set.releaseDate}`)).toBeInTheDocument()
  })

  test('renders SetCard snapshot', () => {
    const { container } = render(<SetCard {...props} />)
    expect(container).toMatchSnapshot()
  })
})
