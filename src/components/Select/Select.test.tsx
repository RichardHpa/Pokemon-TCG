import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Select } from './Select'

const onChange = jest.fn()
const defaultOptions = [
  {
    label: 'test',
    value: '1',
  },
  {
    label: 'test2',
    value: '2',
  },
]

describe('Select', () => {
  test('renders Select', () => {
    const { container } = render(<Select options={defaultOptions} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(2)

    expect(container).toMatchSnapshot()
  })

  test('onChange gets called when new option is selected', async () => {
    render(<Select options={defaultOptions} onChange={onChange} />)
    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()

    expect(onChange).not.toHaveBeenCalled()

    await userEvent.selectOptions(select, [defaultOptions[1].value])

    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith('2')
  })
})
