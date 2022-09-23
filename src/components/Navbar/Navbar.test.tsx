import { setMatchMediaMock } from 'tests/matchMediaMock'
import { render, screen } from 'tests/renderHelpers'

import { Navbar } from './Navbar'

describe('Navbar', () => {
  beforeEach(() => {
    setMatchMediaMock()
  })

  test('renders Navbar', () => {
    render(<Navbar />)

    const link = screen.getByRole('link', { name: /site logo/i })

    expect(link).toBeInTheDocument()

    expect(link).toMatchSnapshot()
  })

  test('renders all links', () => {
    render(<Navbar />)

    const homeLink = screen.getByRole('link', { name: /home/i })
    const aboutLink = screen.getByRole('link', { name: /about/i })

    expect(homeLink).toBeInTheDocument()
    expect(aboutLink).toBeInTheDocument()
  })
})
