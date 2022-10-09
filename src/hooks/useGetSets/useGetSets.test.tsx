import { renderHook, waitFor } from '@testing-library/react'

import { useGetSets } from './useGetSets'

import { sets } from 'fixtures/sets'

describe('useGetSets', () => {
  it('should return data', async () => {
    const { result } = renderHook(() =>
      useGetSets({
        pageSize: 4,
        orderBy: '-releaseDate',
      }),
    )

    await waitFor(() => {
      expect(result.current.loading).toEqual(false)
    })

    expect(result.current.data).toBeDefined()
    expect(result.current.data.data).toEqual(sets)
  })

  it('should work with no values', async () => {
    const { result } = renderHook(() => useGetSets())

    await waitFor(() => {
      expect(result.current.loading).toEqual(false)
    })

    expect(result.current.data).toBeDefined()
    expect(result.current.data.data).toEqual(sets)
  })
})
