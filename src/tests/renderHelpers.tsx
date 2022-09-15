import { render as baseRender } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'providers/ThemeProvider'

import type { FC, ReactElement } from 'react'
import type { RenderOptions } from '@testing-library/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Providers: FC<any> = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider>{children}</ThemeProvider>
  </BrowserRouter>
)

export * from '@testing-library/react'

export const render = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) => {
  return baseRender(ui, { ...options, wrapper: Providers })
}
