import { render, screen } from '@testing-library/react'

import { Alert } from './Alert'

describe('Alert', () => {
  test('renders an Alert', () => {
    const { container } = render(<Alert>alert children</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  test.each([
    ['info', 'border-blue-300 '],
    ['success', 'border-green-300'],
    ['error', 'border-red-300'],
    ['warning', 'border-yellow-300'],
    ['dark', 'border-gray-300'],
  ] as const)('renders Alert with status:%s', (status, expected) => {
    render(<Alert status={status}>Test</Alert>)
    expect(screen.getByRole('alert')).toHaveClass(expected)
  })
})
