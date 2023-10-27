import { renderHook, waitFor } from '@testing-library/react'

import { useGetSet } from './useGetSet'

import { set } from 'fixtures/sets'

describe('useGetSet', () => {
  it('should return data', async () => {
    const { result } = renderHook(() => useGetSet('sv1'))

    await waitFor(() => {
      expect(result.current.loading).toEqual(false)
    })

    expect(result.current).toEqual({
      set,
      error: undefined,
      loading: false,
    })
  })
})
