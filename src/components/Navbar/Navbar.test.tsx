import { setMatchMediaMock } from 'tests/matchMediaMock'
import { render, screen } from 'tests/renderHelpers'

import { Navbar } from './Navbar'

describe('Navbar', () => {
  beforeEach(() => {
    setMatchMediaMock()
  })

  test('renders Navbar', () => {
    render(<Navbar />)

    const link = screen.getByRole('link', { name: /Pokemon Card Checker/i })

    expect(link).toBeInTheDocument()
  })

  test('renders all links', () => {
    render(<Navbar />)

    expect(screen.getAllByRole('link')).toHaveLength(5)

    const homeLink = screen.getByRole('link', { name: /home/i })
    const setsLink = screen.getByRole('link', { name: /sets/i })

    expect(homeLink).toBeInTheDocument()
    expect(setsLink).toBeInTheDocument()
  })

  test('renders Navbar snapshot', () => {
    const { container } = render(<Navbar />)
    expect(container).toMatchSnapshot()
  })
})
