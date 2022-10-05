import { Card } from 'components/Card'

import type { Set } from 'types/fixtures/set'

interface SetCardProps extends Pick<Set, 'name' | 'series' | 'releaseDate'> {
  image: string
}

export const SetCard = ({ image, name, series, releaseDate }: SetCardProps) => {
  return (
    <Card>
      <div className='flex flex-col h-full'>
        <div className='flex justify-center mb-4'>
          <img className='w-full max-w-xs' src={image} alt={`${name} logo`} />
        </div>

        <div className='mt-auto'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {name}
          </h5>

          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
            {series} - {releaseDate}
          </p>
        </div>
      </div>
    </Card>
  )
}
