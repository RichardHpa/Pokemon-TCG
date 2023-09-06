import { useEffect, useState, useMemo, useCallback } from 'react'
import axios from 'axios'

import type { UseGetSets } from './types'
import type { Set } from 'types/fixtures/set'

const apiRoute = 'https://api.pokemontcg.io/v2/sets'

const getSets = async ({ pageSize, query, orderBy, page }) => {
  try {
    const response = await axios.get(apiRoute, {
      params: {
        q: query,
        pageSize,
        orderBy,
        page,
      },
    })
    return response
  } catch (error) {
    console.error(error)
  }
}

export const useGetSets = ({ query = '', pageSize = 20, orderBy = '' }: UseGetSets = {}) => {
  const [sets, setSets] = useState<Set[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>()
  const [page, setPage] = useState<number>(1)

  const hasMore = useMemo(() => {
    if (sets?.length && totalCount) {
      return sets?.length < totalCount
    }

    return false
  }, [sets, totalCount])

  useEffect(() => {
    ;(async () => {
      const res = await getSets({ pageSize, query, orderBy, page: 1 })
      setSets(res?.data.data)
      setTotalCount(res?.data.totalCount)
      setLoading(false)
      setIsFetching(false)
    })()

    return () => {
      // this now gets called when the component unmounts
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- want this to run on mount
  }, [])

  const fetchMoreSets = useCallback(async () => {
    if (!hasMore) return
    setIsFetching(true)

    const res = await getSets({ pageSize, query, orderBy, page: page + 1 })
    const newSets = res?.data.data
    const newCollection = sets ? [...sets, ...newSets] : newSets
    setSets(newCollection)
    setIsFetching(false)
    setPage(page + 1)
  }, [sets, hasMore, orderBy, page, pageSize, query])

  const fetchSets = useCallback(async () => {
    setSets([])
    setIsFetching(true)
    setLoading(true)

    const res = await getSets({ pageSize, query, orderBy, page: 1 })
    const newSets = res?.data.data
    setSets(newSets)
    setIsFetching(false)
    setLoading(false)
    setPage(1)
  }, [orderBy, pageSize, query])

  return {
    sets,
    loading,
    isFetching,
    hasMore,
    fetchMoreSets,
    fetchSets,
  }
}
