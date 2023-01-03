import useAxios from 'axios-hooks'

const apiRoute = 'https://api.pokemontcg.io/v2/sets'

export const useGetSet = (id?: string | number) => {
  const [{ data, loading, error }] = useAxios({
    url: `${apiRoute}/${id}`,
  })

  return {
    data: data?.data,
    loading,
    error,
  }
}
