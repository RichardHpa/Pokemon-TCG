import { screen, render, waitFor } from '@testing-library/react'
import { sets } from 'fixtures/sets'

import { Home } from './Home'

describe('Home', () => {
  it('renders', async () => {
    render(<Home />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('Latest Pokemon TCG Sets')).toBeInTheDocument()
    })
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()

    sets.forEach((set) => {
      expect(screen.getByText(set.name)).toBeInTheDocument()
    })
  })
})
