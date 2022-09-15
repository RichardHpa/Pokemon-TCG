import type { variant } from 'types/variants'
import type { colors } from 'types/colors'

export type ButtonProps = {
  className?: string
  color?: colors
  variant?: variant
  disabled?: boolean
} & React.ComponentPropsWithoutRef<'button'>
