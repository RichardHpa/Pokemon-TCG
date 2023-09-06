import { forwardRef } from 'react'
import clsx from 'clsx'

import { baseClasses } from './baseClasses'

import type { ButtonProps } from './types'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color = 'primary', className, variant = 'solid', disabled, onClick, ...props }, ref) => {
    return (
      <button
        disabled={disabled}
        ref={ref}
        onClick={onClick}
        className={clsx(
          baseClasses.base,
          baseClasses.variant[variant][color],
          { [baseClasses.disabled]: disabled },
          className,
        )}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
