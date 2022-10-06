import type { FC, ReactNode } from 'react'

interface CardProps {
  children: ReactNode
}

export const Card: FC<CardProps> = ({ children }) => {
  return (
    <div className='bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 h-full p-4'>
      {children}
    </div>
  )
}
