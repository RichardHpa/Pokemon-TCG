interface Breadcrumb {
  label: string
  path?: string
}

export interface BreadcrumbHeaderProps {
  title: string
  breadcrumbs?: Breadcrumb[]
}
