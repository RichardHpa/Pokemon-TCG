import clsx from 'clsx'

import type { FC, ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  full?: boolean
}

export const Card: FC<CardProps> = ({ children, full = true }) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-4',
        { 'h-full': full },
      )}
    >
      {children}
    </div>
  )
}
