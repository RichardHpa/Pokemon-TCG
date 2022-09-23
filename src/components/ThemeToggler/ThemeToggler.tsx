import { IconButton } from 'components/Button'

import { useTheme, Theme } from 'providers/ThemeProvider'

import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

export const ThemeToggler = () => {
  const [theme, setTheme] = useTheme()

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT))
  }
  return (
    <IconButton
      variant='ghost'
      color='inherit'
      icon={theme === Theme.LIGHT ? <MoonIcon /> : <SunIcon />}
      onClick={toggleTheme}
      aria-label={theme === Theme.LIGHT ? 'Switch to dark mode' : 'Switch to light mode'}
    />
  )
}
