import { screen, render } from '@testing-library/react'

import { LoadingPokeBall } from './LoadingPokeBall'

describe('LoadingPokeBall', () => {
  it('should render', () => {
    render(<LoadingPokeBall size='100' loading={true} />)
    const pokeBall = screen.getByRole('progress')
    expect(pokeBall).toBeInTheDocument()
    expect(pokeBall).toHaveAttribute('aria-label', 'fetching')
  })

  it('should render with loading false', () => {
    render(<LoadingPokeBall size='100' loading={false} />)
    const pokeBall = screen.getByRole('progress')
    expect(pokeBall).toBeInTheDocument()
    expect(pokeBall).toHaveAttribute('aria-label', 'opened')
  })

  it('should render with opened true', () => {
    render(<LoadingPokeBall size='100' opened={true} />)
    const pokeBall = screen.getByRole('progress')
    expect(pokeBall).toBeInTheDocument()
    expect(pokeBall).toHaveAttribute('aria-label', 'opened')
  })

  it('should render with opened false', () => {
    render(<LoadingPokeBall size='100' opened={false} />)
    const pokeBall = screen.getByRole('progress')
    expect(pokeBall).toBeInTheDocument()
    expect(pokeBall).toHaveAttribute('aria-label', 'fetching')
  })

  it('should render with size 50', () => {
    render(<LoadingPokeBall />)
    const pokeBall = screen.getByRole('progress')
    expect(pokeBall).toBeInTheDocument()
    expect(pokeBall).toHaveAttribute('width', '50')
    expect(pokeBall).toHaveAttribute('height', '50')
  })

  it.each([10, 100])('should render with size %i', (size) => {
    render(<LoadingPokeBall size={size} />)
    const pokeBall = screen.getByRole('progress')
    expect(pokeBall).toBeInTheDocument()
    expect(pokeBall).toHaveAttribute('width', `${size}`)
    expect(pokeBall).toHaveAttribute('height', `${size}`)
  })

  it('should match snapshot', () => {
    const { container } = render(<LoadingPokeBall />)
    expect(container).toMatchSnapshot()
  })

  it.each([10, 100])('should render with size %i', (size) => {
    const { container } = render(<LoadingPokeBall size={size} />)
    expect(container).toMatchSnapshot()
  })
})
