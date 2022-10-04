import useAxios from 'axios-hooks'

import type { UseGetSets } from './types'

const apiRoute = 'https://api.pokemontcg.io/v2/sets'

export const useGetSets = ({ query = '', page = 1, pageSize = 20, orderBy = '' }: UseGetSets) => {
  const apiQuery = `${apiRoute}?q=${query}&page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`
  const [{ data, loading, error }] = useAxios(apiQuery)

  console.log(apiQuery)
  return {
    data,
    loading,
    error,
  }
}
