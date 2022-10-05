import { useGetSets } from 'hooks/useGetSets'

import { SetCard } from 'components/SetCard'
import { Button } from 'components/Button'

import type { Set } from 'types/fixtures/set'

export const Sets = () => {
  const { data, error, loadMore, isFetching } = useGetSets({
    pageSize: 8,
    orderBy: 'releaseDate',
  })

  if (error) {
    return <div>Error</div>
  }
  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-800 dark:text-white text-center mb-4'>
        All Pokemon TCG Sets
      </h1>
      <div className='grid grid-cols-4 gap-3'>
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
      <div className='mt-4 flex justify-center'>
        <Button onClick={loadMore} disabled={isFetching}>
          Load More
        </Button>
      </div>
    </div>
  )
}
