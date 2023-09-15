import { render, screen } from 'tests/renderHelpers'

import { NavLink } from './NavLink'

describe('NavLink', () => {
  test('renders NavLink', () => {
    render(<NavLink to='/'>Test</NavLink>)

    const link = screen.getByRole('link', { name: /test/i })

    expect(link).toBeInTheDocument()
  })

  test('renders NavLink with className', () => {
    render(
      <NavLink to='/' className='test'>
        Test
      </NavLink>,
    )

    const link = screen.getByRole('link', { name: /test/i })

    expect(link).toHaveClass('test')
  })

  test('renders NavLink snapshot', () => {
    const { container } = render(<NavLink to='/'>Test</NavLink>)
    expect(container).toMatchSnapshot()
  })
})
