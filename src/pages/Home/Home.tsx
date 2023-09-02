import { Link } from 'react-router-dom'

import { useGetSets } from 'hooks/useGetSets'

import { SetCard } from 'components/SetCard'
import { LoadingPokeBall } from 'components/LoadingPokeBall'
import { SearchCard } from './components/SearchCard'
import { BreadcrumbHeader } from 'components/BreadcrumbHeader'

import { RandomCard } from './components/RandomCard'

import type { Set } from 'types/fixtures/set'

export const Home = () => {
  const { loading, data, error } = useGetSets({
    pageSize: 3,
    orderBy: '-releaseDate',
  })

  if (error) {
    return <div>Error</div>
  }

  if (loading) {
    return (
      <div className='flex justify-center'>
        <LoadingPokeBall size='100' loading={true} />
      </div>
    )
  }

  return (
    <div>
      <div className='mb-6'>
        <BreadcrumbHeader title='Latest Pokemon TCG Sets' />

        {data?.data && (
          <div className='grid grid-cols-3 gap-3' role='list'>
            {data?.data.map((set: Set) => {
              return (
                <div key={set.id} className='flex-1 items-stretch' role='listitem'>
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
        )}
      </div>

      <RandomCard />

      <SearchCard />
    </div>
  )
}
