import { renderHook } from '@testing-library/react-hooks'
import { useGetSets } from './useGetSets'

import { sets } from 'fixtures/sets'

describe('useGetSets', () => {
  it('should return data', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useGetSets({
        pageSize: 4,
        orderBy: '-releaseDate',
      }),
    )

    await waitForNextUpdate()

    expect(result.current.data).toBeDefined()
    expect(result.current.data.data).toEqual(sets)
  })

  it('should work with no values', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetSets())

    await waitForNextUpdate()

    expect(result.current.data).toBeDefined()
    expect(result.current.data.data).toEqual(sets)
  })
})
