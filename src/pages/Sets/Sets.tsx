import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { useGetSets } from 'hooks/useGetSets'

import { SetCard } from 'components/SetCard'
import { Button } from 'components/Button'
import { LoadingPokeBall } from 'components/LoadingPokeBall'
import { BreadcrumbHeader } from 'components/BreadcrumbHeader'

import type { Set } from 'types/fixtures/set'

export const Sets = () => {
  const { data, error, loadMore, isFetching, loading } = useGetSets({
    pageSize: 8,
    orderBy: 'releaseDate',
  })

  const showMore = useMemo(() => {
    if (data?.data?.length) {
      return data.data.length < data.totalCount
    }

    return false
  }, [data])

  if (error) {
    return <div>Error</div>
  }

  return (
    <div>
      <BreadcrumbHeader
        title='Pokemon TCG Sets'
        breadcrumbs={[
          {
            label: 'Sets',
          },
        ]}
      />

      {loading && (
        <div className='flex justify-center'>
          <LoadingPokeBall size='100' loading={true} />
        </div>
      )}

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {data?.data.map((set: Set) => {
          return (
            <div key={set.id} className='flex-1 items-stretch'>
              <Link to={`/sets/${set.id}`}>
                <SetCard
                  name={set.name}
                  series={set.series}
                  releaseDate={set.releaseDate}
                  image={set.images.logo}
                />
              </Link>
            </div>
          )
        })}
      </div>
      {showMore && (
        <div className='mt-4 flex justify-center'>
          <Button onClick={loadMore} disabled={isFetching}>
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}
