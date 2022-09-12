import { renderWithRouter } from 'tests/renderHelpers'
import { screen } from '@testing-library/react'
import App from './App'

test('renders Hello world!', () => {
  renderWithRouter(<App />)
  expect(screen.getByText('Hello world!!!')).toBeInTheDocument()
})
