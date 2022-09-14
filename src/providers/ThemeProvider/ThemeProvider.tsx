import { useState, createContext, useContext, useEffect } from 'react'

import type { Dispatch, SetStateAction, ReactNode } from 'react'

enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

const themes: Array<Theme> = Object.values(Theme)

type ThemeContextType = [Theme | null, Dispatch<SetStateAction<Theme>>]

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const prefersDarkMQ = '(prefers-color-scheme: dark)'
const getPreferredTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedTheme = window.localStorage.getItem('demo-app-current-theme') as Theme
    if (storedTheme && themes.includes(storedTheme)) {
      return storedTheme
    }
    return window.matchMedia(prefersDarkMQ).matches ? Theme.DARK : Theme.LIGHT
  }

  return Theme.LIGHT
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    return getPreferredTheme()
  })

  const checkTheme = (existing: Theme) => {
    const root = window.document.documentElement
    const isDark = existing === Theme.DARK

    root.classList.remove(isDark ? Theme.LIGHT : Theme.DARK)
    root.classList.add(existing)

    localStorage.setItem('demo-app-current-theme', existing)
  }

  useEffect(() => {
    checkTheme(theme)
  }, [theme])

  return <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>
}

function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export { Theme, ThemeProvider, useTheme }
