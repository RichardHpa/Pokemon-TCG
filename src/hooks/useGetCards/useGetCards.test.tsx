import { renderHook, waitFor } from '@testing-library/react'

import { useGetCards } from './useGetCards'

import { cards } from 'fixtures/cards'

describe('useGetCards', () => {
  test('should return data', async () => {
    const { result } = renderHook(() =>
      useGetCards({
        query: 'name:charizard',
      }),
    )

    await waitFor(() => {
      expect(result.current.loading).toEqual(false)
    })

    expect(result.current.data).toBeDefined()
    expect(result.current.data.data).toEqual(cards)
  })
})
