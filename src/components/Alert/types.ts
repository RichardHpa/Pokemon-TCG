import type { ReactNode } from 'react'

export interface AlertProps {
  status?: 'info' | 'success' | 'error' | 'warning' | 'dark'
  children: ReactNode
}
