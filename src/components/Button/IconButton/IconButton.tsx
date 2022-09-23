import clsx from 'clsx'
import { cloneElement, useMemo } from 'react'

import { baseClasses } from 'components/Button/baseClasses'

import type { ButtonProps } from 'components/Button/types'
import type { colors } from 'types/colors'
interface IconButtonProps extends Omit<ButtonProps, 'children' | 'color'> {
  icon: JSX.Element
  color?: colors | 'inherit'
}

const iconButtonClasses = {
  base: 'inline-flex align-middle justify-center rounded-full p-2',
}

export const IconButton = ({
  icon,
  color = 'primary',
  className,
  variant = 'solid',
  disabled,
  ...props
}: IconButtonProps) => {
  const Icon = useMemo(
    () =>
      cloneElement(icon, {
        className: 'h-6 w-6 inline-block',
      }),
    [icon],
  )
  return (
    <button
      className={clsx(
        iconButtonClasses.base,
        baseClasses.variant[variant][color],
        { [baseClasses.disabled]: disabled },
        className,
      )}
      {...props}
    >
      {Icon}
    </button>
  )
}
