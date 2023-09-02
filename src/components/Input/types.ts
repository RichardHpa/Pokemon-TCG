import type { ChangeEventHandler } from 'react'

export type InputProps = {
  onChange: ChangeEventHandler
} & React.ComponentPropsWithoutRef<'input'>
