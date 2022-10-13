import useAxios from 'axios-hooks'

import type { UseGetCards } from './types'

const apiRoute = 'https://api.pokemontcg.io/v2/cards'

export const useGetCards = ({
  query,
  pageSize = 1,
  orderBy = '',
  manual = false,
  page = 1,
}: UseGetCards) => {
  const [{ data, loading, error }] = useAxios(
    {
      url: apiRoute,
      params: {
        q: query,
        page,
        pageSize: pageSize,
        orderBy,
      },
    },
    {
      manual,
    },
  )

  return {
    data,
    loading,
    error,
  }
}
