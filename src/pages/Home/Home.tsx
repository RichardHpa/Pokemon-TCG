import { Link } from 'react-router-dom'

import { useGetSets } from 'hooks/useGetSets'

import { Card } from 'components/Card'
import { Button } from 'components/Button'

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
      <h1 className='text-3xl font-bold text-gray-800 dark:text-white text-center mb-4'>
        Latest Pokemon TCG Sets
      </h1>
      <div className='grid grid-cols-3 gap-3'>
        {data?.data.map((set: Set) => {
          return (
            <div key={set.id} className='flex-1 items-stretch'>
              <Card>
                <div className='flex flex-col h-full'>
                  <div className='flex justify-center mb-4'>
                    <img
                      className='w-full max-w-xs'
                      src={set.images?.logo}
                      alt={`${set.name} logo`}
                    />
                  </div>

                  <div className='mt-auto'>
                    <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                      {set.name}
                    </h5>

                    <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                      {set.series} - {set.releaseDate}
                    </p>
                    <Link to={`/sets/${set.id}`}>
                      <Button>View Set</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}
