import type { FC, ReactNode } from 'react'

interface CardProps {
  children: ReactNode
}

export const Card: FC<CardProps> = ({ children }) => {
  return <div>{children}</div>
}
