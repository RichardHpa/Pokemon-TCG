import { render, screen } from '@testing-library/react'

import { Footer } from './Footer'

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))

describe('Footer', () => {
  test('renders footer', () => {
    render(<Footer />)
    expect(screen.getByText('Copyright © 2020')).toBeInTheDocument()
  })

  test('renders Footer snapshot', () => {
    const { container } = render(<Footer />)
    expect(container).toMatchSnapshot()
  })
})
