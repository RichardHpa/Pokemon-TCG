export type ButtonProps = {
  className?: string
  color?: 'primary' | 'secondary' | 'danger'
  variant?: 'solid' | 'outline' | 'ghost'
  disabled?: boolean
} & React.ComponentPropsWithoutRef<'button'>
