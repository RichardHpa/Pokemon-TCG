import { render, screen } from '@testing-library/react'

import { Paragraph } from './Paragraph'

describe('Paragraph', () => {
  test('renders basic paragraph', () => {
    const { container } = render(<Paragraph>content</Paragraph>)
    expect(screen.getByText('content')).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
})
