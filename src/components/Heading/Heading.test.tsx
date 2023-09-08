import { render, screen } from '@testing-library/react'

import { Heading } from './Heading'

describe('Heading', () => {
  test('renders Heading', () => {
    const { container } = render(<Heading>Heading Text</Heading>)
    expect(screen.getByRole('heading', { level: 1, name: 'Heading Text' })).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  test.each(['1', '2', '3', '4', '5', '6'] as const)('renders Heading with level:%s', (level) => {
    render(<Heading level={level}>Heading Text</Heading>)
    expect(
      screen.getByRole('heading', { level: Number(level), name: 'Heading Text' }),
    ).toBeInTheDocument()
  })
})
