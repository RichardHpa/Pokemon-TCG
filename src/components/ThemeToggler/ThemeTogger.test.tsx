import { render, screen } from 'tests/renderHelpers'
import userEvent from '@testing-library/user-event'

import { ThemeToggler } from './ThemeToggler'

describe('ThemeToggler', () => {
  test('renders ThemeToggler with default dark mode', () => {
    render(<ThemeToggler />)
    const button = screen.getByRole('button', { name: /switch to dark mode/i })

    expect(button).toBeInTheDocument()
  })

  test('clicks on the button changes to theme', async () => {
    render(<ThemeToggler />)
    const button = screen.getByRole('button', { name: /switch to dark mode/i })
    expect(button).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /switch to light mode/i })).not.toBeInTheDocument()

    await userEvent.click(button)

    const newButton = screen.getByRole('button', { name: /switch to light mode/i })
    expect(screen.queryByRole('button', { name: /switch to dark mode/i })).not.toBeInTheDocument()
    expect(newButton).toBeInTheDocument()
  })

  test('renders ThemeToggler snapshot', () => {
    const { container } = render(<ThemeToggler />)
    expect(container).toMatchSnapshot()
  })
})
