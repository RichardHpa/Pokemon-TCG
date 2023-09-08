import { rest } from 'msw'
import { server } from 'mocks/server'

import { waitFor, renderHook, act } from '@testing-library/react'

import { useGetCards } from './useGetCards'

import { cards } from 'fixtures/cards'

import type { MockedRequest } from 'msw'

let allRequests: MockedRequest[] = []

const mockAPIWithMoreResults = () =>
  server.use(
    rest.get('https://api.pokemontcg.io/v2/cards', (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: cards,
          page: 1,
          pageSize: cards.length,
          count: cards.length,
          //  has to be larger than cards.length
          totalCount: cards.length + 1,
        }),
      )
    }),
  )

server.events.on('request:start', (req) => {
  allRequests.push(req)
})

describe('useGetCards', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()

    allRequests = []
  })

  test('should return data', async () => {
    const { result } = renderHook(() => useGetCards())

    expect(result.current).toStrictEqual({
      cards: undefined,
      fetchMoreCards: expect.any(Function),
      hasMore: false,
      isFetching: true,
      loading: true,
      totalCount: undefined,
    })

    await waitFor(() => {
      expect(result.current.loading).toEqual(false)
    })

    expect(result.current).toStrictEqual({
      cards: cards,
      fetchMoreCards: expect.any(Function),
      hasMore: false,
      isFetching: false,
      loading: false,
      totalCount: 3,
    })
  })

  test('query gets passed to the api', async () => {
    const { result } = renderHook(() => useGetCards({ query: 'name:Charizard' }))

    await waitFor(() => {
      expect(result.current.loading).toEqual(false)
    })
    expect(result.current.loading).toBe(false)

    // query should be name:Charizard
    expect(allRequests[0].url.href).toBe(
      'https://api.pokemontcg.io/v2/cards?q=name:Charizard&pageSize=1&orderBy=&page=1',
    )
  })

  test('orderBy gets passed to the api', async () => {
    const { result } = renderHook(() => useGetCards({ orderBy: 'name' }))

    await waitFor(() => {
      expect(result.current.loading).toEqual(false)
    })
    expect(result.current.loading).toBe(false)

    // orderBy should be name
    expect(allRequests[0].url.href).toBe(
      'https://api.pokemontcg.io/v2/cards?q=&pageSize=1&orderBy=name&page=1',
    )
  })

  test('pageSize gets passed to the api', async () => {
    const { result } = renderHook(() => useGetCards({ pageSize: 2 }))

    await waitFor(() => {
      expect(result.current.loading).toEqual(false)
    })
    expect(result.current.loading).toBe(false)

    // pageSize should be 2
    expect(allRequests[0].url.href).toBe(
      'https://api.pokemontcg.io/v2/cards?q=&pageSize=2&orderBy=&page=1',
    )
    expect(allRequests).toHaveLength(1)
  })

  test("hasMore returns true if you don't get all from the api", async () => {
    const { result } = renderHook(() => useGetCards())
    mockAPIWithMoreResults()

    expect(result.current.hasMore).toBe(false)

    await waitFor(() => {
      expect(result.current.loading).toEqual(false)
    })

    expect(result.current.hasMore).toBe(true)
    expect(allRequests).toHaveLength(1)
  })

  describe('fetchMoreCards', () => {
    test('calling fetchMoreCards when hasMore is true should call api', async () => {
      const { result } = renderHook(() => useGetCards())
      mockAPIWithMoreResults()

      expect(result.current.hasMore).toBe(false)

      await waitFor(() => {
        expect(result.current.loading).toEqual(false)
      })

      expect(result.current.hasMore).toBe(true)

      act(() => {
        result.current.fetchMoreCards()
      })
      expect(result.current.isFetching).toEqual(true)

      await waitFor(() => {
        expect(result.current.isFetching).toEqual(false)
      })

      expect(allRequests).toHaveLength(2)
    })

    test('calling fetchMoreCards when hasMore is false shouldnt call api', async () => {
      const { result } = renderHook(() => useGetCards())

      expect(result.current.hasMore).toBe(false)

      await waitFor(() => {
        expect(result.current.loading).toEqual(false)
      })

      expect(result.current.hasMore).toBe(false)

      act(() => {
        result.current.fetchMoreCards()
      })
      expect(result.current.isFetching).toEqual(false)

      expect(allRequests).toHaveLength(1)
    })
  })
})
