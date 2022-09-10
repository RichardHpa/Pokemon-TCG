import { render as baseRender } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import type { ReactElement } from 'react'

export const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return {
    ...baseRender(ui, { wrapper: BrowserRouter }),
  }
}
