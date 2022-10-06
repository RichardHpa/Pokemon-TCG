import { render, screen } from '@testing-library/react'

import { Card } from './Card'

describe('Card', () => {
  test('renders Card', () => {
    render(<Card>Card</Card>)
    expect(screen.getByText('Card')).toBeInTheDocument()
  })

  test('renders Card snapshot', () => {
    const { container } = render(<Card>Test</Card>)
    expect(container).toMatchSnapshot()
  })
})
