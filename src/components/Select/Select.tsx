import { forwardRef } from 'react'

import type { SelectProps } from './types'

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, onChange, ...props }, ref) => {
    return (
      <select
        onChange={onChange}
        ref={ref}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        {...props}
      >
        {options.map((option) => {
          const { label, value, ...optionProps } = option
          return (
            <option key={label} value={value} {...optionProps}>
              {label}
            </option>
          )
        })}
      </select>
    )
  },
)

Select.displayName = 'Select'
