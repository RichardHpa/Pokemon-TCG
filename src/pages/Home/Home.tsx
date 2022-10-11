import { useGetSets } from 'hooks/useGetSets'

import { SetCard } from 'components/SetCard'
import { LoadingPokeBall } from 'components/LoadingPokeBall'

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
        <h1 className='text-3xl font-bold text-gray-800 dark:text-white text-center mb-4'>
          Latest Pokemon TCG Sets
        </h1>
        {data?.data && (
          <div className='grid grid-cols-3 gap-3'>
            {data?.data.map((set: Set) => {
              return (
                <div key={set.id} className='flex-1 items-stretch'>
                  <SetCard
                    name={set.name}
                    series={set.series}
                    releaseDate={set.releaseDate}
                    image={set.images.logo}
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>

      <RandomCard />
    </div>
  )
}
