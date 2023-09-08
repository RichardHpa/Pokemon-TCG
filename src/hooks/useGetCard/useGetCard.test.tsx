import { rest } from 'msw'
import { server } from 'mocks/server'

import { waitFor, renderHook } from '@testing-library/react'

import { useGetCard } from './useGetCard'

import { card } from 'fixtures/cards'

describe('useGetCard', () => {
  test('should return data', async () => {
    const { result } = renderHook(() => useGetCard('1'))

    expect(result.current).toStrictEqual({
      card: undefined,
      loading: true,
      error: undefined,
    })

    await waitFor(() => {
      expect(result.current.loading).toEqual(false)
    })

    expect(result.current).toStrictEqual({
      card,
      loading: false,
      error: undefined,
    })
  })

  test('throw error if no card id found', async () => {
    server.use(
      rest.get('https://api.pokemontcg.io/v2/cards', (_req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: [],
            page: 1,
            pageSize: 1,
            count: 0,
            totalCount: 0,
          }),
        )
      }),
    )
    const { result } = renderHook(() => useGetCard('1'))

    expect(result.current).toStrictEqual({
      card: undefined,
      loading: true,
      error: undefined,
    })

    await waitFor(() => {
      expect(result.current.loading).toEqual(false)
    })

    expect(result.current).toStrictEqual({
      card: undefined,
      loading: false,
      error: 'Cannot find a card with id:1',
    })
  })
})
