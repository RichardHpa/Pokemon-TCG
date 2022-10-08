import { screen, render, waitFor } from '@testing-library/react'
import { sets } from 'fixtures/sets'

import { Home } from './Home'

describe('Home', () => {
  it('renders', async () => {
    render(<Home />)

    expect(screen.getByRole('progress')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('Latest Pokemon TCG Sets')).toBeInTheDocument()
    })
    expect(screen.queryByRole('progress')).not.toBeInTheDocument()

    sets.forEach((set) => {
      expect(screen.getByText(set.name)).toBeInTheDocument()
    })
  })
})
