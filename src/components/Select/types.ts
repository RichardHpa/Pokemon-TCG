export type OptionProps = {
  value?: string
  label: string
} & React.ComponentPropsWithoutRef<'option'>

export type SelectProps = {
  options: OptionProps[]
} & React.ComponentPropsWithoutRef<'select'>
