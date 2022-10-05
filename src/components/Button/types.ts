import type { variant } from 'types/variants'
import type { colors } from 'types/colors'

import type { MouseEventHandler } from 'react'

export type ButtonProps = {
  className?: string
  color?: colors
  variant?: variant
  disabled?: boolean
  onClick?: MouseEventHandler
} & React.ComponentPropsWithoutRef<'button'>
