import { useGetSets } from 'hooks/useGetSets'

import { Card } from 'components/Card'

import type { Set } from 'types/fixtures/set'

export const Home = () => {
  const { data, loading, error } = useGetSets({
    page: 1,
    pageSize: 3,
    orderBy: '-releaseDate',
  })

  if (error) {
    return <div>Error</div>
  }

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <div>
      {data?.data.map((set: Set) => {
        return <Card key={set.id}>{set.name}</Card>
      })}
    </div>
  )
}
