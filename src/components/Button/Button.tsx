import clsx from 'clsx'
import React from 'react'

type ButtonProps = {
  className?: string
  color?: 'primary' | 'secondary' | 'danger'
  variant?: 'solid' | 'outline' | 'ghost'
  disabled?: boolean
} & React.ComponentPropsWithoutRef<'button'>

const classes = {
  base: 'inline-block py-2 px-4 rounded border',
  disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
  variant: {
    solid: {
      primary: 'bg-blue-500 text-white hover:bg-blue-600 border-blue-500',
      secondary: 'bg-gray-500 text-white hover:bg-gray-600 border-gray-500',
      danger: 'bg-red-500 text-white hover:bg-red-600 border-red-500',
    },
    outline: {
      primary: 'text-blue-500 hover:bg-blue-500 hover:text-white border-blue-500',
      secondary: 'text-gray-500 hover:bg-gray-500 hover:text-white border-gray-500',
      danger: 'text-red-500 hover:bg-red-500 hover:text-white border-red-500',
    },
    ghost: {
      primary: 'text-blue-500 hover:bg-blue-500 hover:text-white border-transparent',
      secondary: 'text-gray-500 hover:bg-gray-500 hover:text-white border-transparent',
      danger: 'text-red-500 hover:bg-red-500 hover:text-white border-transparent',
    },
  },
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color = 'primary', className, variant = 'solid', disabled, ...props }, ref) => {
    return (
      <button
        {...props}
        disabled={disabled}
        ref={ref}
        className={clsx(
          classes.base,
          classes.variant[variant][color],
          { [classes.disabled]: disabled },
          className,
        )}
      />
    )
  },
)

Button.displayName = 'Button'
