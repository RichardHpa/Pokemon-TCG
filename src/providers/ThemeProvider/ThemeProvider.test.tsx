import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Theme, ThemeProvider, useTheme } from './ThemeProvider'

import type { ReactElement } from 'react'

const providerRender = (ui: ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>)
}

const ThemeExample = () => {
  const [theme, setTheme] = useTheme()

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT))
  }

  return (
    <div>
      <button onClick={toggleTheme}>Change Theme</button>
      <div data-testid='theme'>{theme}</div>
    </div>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    global.matchMedia =
      global.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        }
      }
  })
  test('expected Theme enum', () => {
    expect(Theme).toEqual({
      DARK: 'dark',
      LIGHT: 'light',
    })
  })

  test('Default Setting is light', () => {
    providerRender(<ThemeExample />)
    expect(screen.getByText('light')).toBeInTheDocument()
  })

  test('Clicking button changes theme', () => {
    providerRender(<ThemeExample />)
    userEvent.click(screen.getByRole('button'))
    expect(screen.getByText('dark')).toBeInTheDocument()
    expect(screen.queryByText('light')).not.toBeInTheDocument()
  })
})
