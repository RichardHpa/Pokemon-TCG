import { NavLink as RouterNavLink } from 'react-router-dom'
import clsx from 'clsx'

import type { FC, ReactNode } from 'react'

interface NavLinkProps {
  to: string
  className?: string
  children: ReactNode
}

export const NavLink: FC<NavLinkProps> = ({ to, children, className }) => {
  return (
    <RouterNavLink
      to={to}
      className={clsx(
        'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 px-3 py-2 rounded-md text-sm font-medium hover:underline',
        className,
      )}
    >
      {children}
    </RouterNavLink>
  )
}
