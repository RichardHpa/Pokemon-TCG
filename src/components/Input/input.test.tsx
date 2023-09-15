import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Input } from './Input'

const onChange = jest.fn()

describe('Input', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Input renders', () => {
    const { container } = render(<Input onChange={onChange} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  test('onChange calls prop', async () => {
    render(<Input onChange={onChange} />)
    const input = screen.getByRole('textbox')
    expect(onChange).not.toHaveBeenCalled()

    await userEvent.type(input, 'test')
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledTimes(4)
    expect(onChange).toHaveBeenCalledWith('test')
  })
})
