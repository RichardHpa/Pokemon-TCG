import { render } from 'tests/renderHelpers'
import { screen } from '@testing-library/react'
import { setMatchMediaMock } from 'tests/matchMediaMock'

import App from './App'

describe('App', () => {
  beforeEach(() => {
    setMatchMediaMock()
  })
  test('renders Hello world!', () => {
    render(<App />)
    expect(screen.getByText('Hello world!!')).toBeInTheDocument()
  })
})
