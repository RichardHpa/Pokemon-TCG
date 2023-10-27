import type { ReactElement } from 'react'

export interface ColumnProps<T> {
  key: string
  label: string | ReactElement
  render?: (column: ColumnProps<T>, item: T) => ReactElement
}

type TableProps<T> = {
  columns: Array<ColumnProps<T>>
  data?: T[]
}

export const Table = <T,>({ data, columns }: TableProps<T>) => {
  const headers = columns.map((column, index) => {
    return (
      <th key={`headCell-${index}`} className='px-6 py-3'>
        {column.label}
      </th>
    )
  })

  const rows = !data?.length ? (
    <tr>
      <td colSpan={columns.length} className='text-center'>
        No data
      </td>
    </tr>
  ) : (
    data?.map((row, index) => {
      return (
        <tr
          key={`row-${index}`}
          className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
        >
          {columns.map((column, index2) => {
            const value = column.render
              ? column.render(column, row as T)
              : (row[column.key as keyof typeof row] as string)

            return (
              <td key={`cell-${index2}`} className='px-6 py-3'>
                {value}
              </td>
            )
          })}
        </tr>
      )
    })
  )

  return (
    <div className='relative overflow-x-auto'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}
