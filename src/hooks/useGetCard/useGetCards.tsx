import useAxios from 'axios-hooks'

import type { UseGetCards } from './types'

const apiRoute = 'https://api.pokemontcg.io/v2/cards'

export const useGetCards = ({ query, pageSize = 1, orderBy = '', manual = false }: UseGetCards) => {
  const [{ data, loading, error }] = useAxios(
    {
      url: apiRoute,
      params: {
        q: query,
        page: 1,
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
