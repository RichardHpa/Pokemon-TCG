import { useState, useEffect, useMemo, useCallback } from 'react'
import axios from 'axios'

import type { UseGetCards } from './types'
import type { Card } from 'types/fixtures/card'

const apiRoute = 'https://api.pokemontcg.io/v2/cards'

const getCards = async ({ pageSize, query, orderBy, page }) => {
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

export const useGetCards = ({ query = '', pageSize = 1, orderBy = '' }: UseGetCards = {}) => {
  const [cards, setCards] = useState<Card[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>()
  const [page, setPage] = useState<number>(1)

  const hasMore = useMemo(() => {
    if (cards?.length && totalCount) {
      return cards?.length < totalCount
    }

    return false
  }, [cards, totalCount])

  const fetchMoreCards = useCallback(async () => {
    if (!hasMore) return
    setIsFetching(true)

    const res = await getCards({ pageSize, query, orderBy, page: page + 1 })
    const newCards = res?.data.data
    const newCollection = cards ? [...cards, ...newCards] : newCards
    setCards(newCollection)
    setIsFetching(false)
    setPage(page + 1)
  }, [cards, hasMore, orderBy, page, pageSize, query])

  useEffect(() => {
    ;(async () => {
      const res = await getCards({ pageSize, query, orderBy, page: 1 })
      setCards(res?.data.data)
      setTotalCount(res?.data.totalCount)
      setLoading(false)
      setIsFetching(false)
    })()

    return () => {
      // this now gets called when the component unmounts
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- want this to run on mount
  }, [])

  return {
    cards,
    loading,
    isFetching,
    totalCount,
    hasMore,
    fetchMoreCards,
    error: cards && cards.length === 0 ? 'Cannot find any cards with these parameters' : undefined,
  }
}
