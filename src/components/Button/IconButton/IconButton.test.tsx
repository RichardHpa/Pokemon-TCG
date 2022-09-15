import { render, screen } from '@testing-library/react'

import { SunIcon } from '@heroicons/react/24/solid'
import { IconButton } from './IconButton'

describe('IconButton', () => {
  test('renders IconButton', () => {
    render(<IconButton icon={<SunIcon />} />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()

    expect(button).toMatchSnapshot()
  })
})
