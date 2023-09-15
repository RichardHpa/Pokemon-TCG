import { render, screen, within } from 'tests/renderHelpers'
import { BreadcrumbHeader } from './BreadcrumbHeader'

describe('BreadcrumbHeader', () => {
  test('renders an BreadcrumbHeader', () => {
    render(<BreadcrumbHeader title='Page Title' />)
    expect(screen.getByRole('heading', { name: 'Page Title', level: 3 })).toBeInTheDocument()
  })

  test('renders breadcrumbs', () => {
    const { container } = render(
      <BreadcrumbHeader
        title='Page Title'
        breadcrumbs={[
          {
            label: 'crumb1',
            path: '/crumb1',
          },
          {
            label: 'crumb2',
          },
        ]}
      />,
    )
    expect(screen.getByRole('heading', { name: 'Page Title', level: 3 })).toBeInTheDocument()
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(3)

    expect(within(listItems[0]).getByLabelText('Return home')).toBeInTheDocument()
    expect(within(listItems[1]).getByRole('link', { name: 'crumb1' })).toBeInTheDocument()
    expect(within(listItems[2]).getByText('crumb2')).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
})
