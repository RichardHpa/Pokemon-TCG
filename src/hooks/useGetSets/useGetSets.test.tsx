import { rest } from 'msw'
import { server } from 'mocks/server'
import { renderHook, waitFor, act } from '@testing-library/react'

import { useGetSets } from './useGetSets'

import { sets } from 'fixtures/sets'

import type { MockedRequest } from 'msw'

let allRequests: MockedRequest[] = []

server.events.on('request:start', (req) => {
  allRequests.push(req)
})

const mockAPIWithMoreResults = () =>
  server.use(
    rest.get('https://api.pokemontcg.io/v2/sets', (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: sets,
          page: 1,
          pageSize: sets.length,
          count: sets.length,
          //  has to be larger than sets.length
          totalCount: sets.length + 1,
        }),
      )
    }),
  )

describe('useGetSets', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()

    allRequests = []
  })

  it('should return data', async () => {
    const { result } = renderHook(() => useGetSets())

    await waitFor(() => {
      expect(result.current.loading).toEqual(false)
    })

    expect(result.current).toEqual({
      sets,
      fetchSets: expect.any(Function),
      fetchMoreSets: expect.any(Function),
      hasMore: false,
      isFetching: false,
      loading: false,
    })
  })

  test('query gets passed to the api', async () => {
    const { result } = renderHook(() => useGetSets({ query: 'id:SV1' }))

    await waitFor(() => {
      expect(result.current.loading).toEqual(false)
    })
    expect(result.current.loading).toBe(false)

    // query should be id:SV1
    expect(allRequests[0].url.href).toBe(
      'https://api.pokemontcg.io/v2/sets?q=id:SV1&pageSize=20&orderBy=&page=1',
    )
  })

  test('pageSize gets passed to the api', async () => {
    const { result } = renderHook(() => useGetSets({ pageSize: 5 }))

    await waitFor(() => {
      expect(result.current.loading).toEqual(false)
    })
    expect(result.current.loading).toBe(false)

    // page size should be 5
    expect(allRequests[0].url.href).toBe(
      'https://api.pokemontcg.io/v2/sets?q=&pageSize=5&orderBy=&page=1',
    )
  })

  test('orderBy gets passed to the api', async () => {
    const { result } = renderHook(() => useGetSets({ orderBy: 'name' }))

    await waitFor(() => {
      expect(result.current.loading).toEqual(false)
    })
    expect(result.current.loading).toBe(false)

    // page size should be 5
    expect(allRequests[0].url.href).toBe(
      'https://api.pokemontcg.io/v2/sets?q=&pageSize=20&orderBy=name&page=1',
    )
  })

  test("hasMore returns true if you don't get all from the api", async () => {
    const { result } = renderHook(() => useGetSets())
    mockAPIWithMoreResults()

    expect(result.current.hasMore).toBe(false)

    await waitFor(() => {
      expect(result.current.loading).toEqual(false)
    })

    expect(result.current.hasMore).toBe(true)
    expect(allRequests).toHaveLength(1)
  })

  describe('fetchMoreSets', () => {
    test('calling fetchMoreSets when hasMore is true should call api', async () => {
      const { result } = renderHook(() => useGetSets())
      mockAPIWithMoreResults()

      expect(result.current.hasMore).toBe(false)

      await waitFor(() => {
        expect(result.current.loading).toEqual(false)
      })

      expect(result.current.hasMore).toBe(true)

      act(() => {
        result.current.fetchMoreSets()
      })
      expect(result.current.isFetching).toEqual(true)

      await waitFor(() => {
        expect(result.current.isFetching).toEqual(false)
      })

      expect(allRequests).toHaveLength(2)
    })

    test('calling fetchMoreSets when hasMore is false shouldnt call api', async () => {
      const { result } = renderHook(() => useGetSets())

      expect(result.current.hasMore).toBe(false)

      await waitFor(() => {
        expect(result.current.loading).toEqual(false)
      })

      expect(result.current.hasMore).toBe(false)

      act(() => {
        result.current.fetchMoreSets()
      })
      expect(result.current.isFetching).toEqual(false)

      expect(allRequests).toHaveLength(1)
    })
  })
})
