import { useState } from 'react'

import { useGetRandomCard } from 'hooks/useGetRandomCard'
import { Button } from 'components/Button'

export const RandomCard = () => {
  const { data: randomCard, loading, fetchRandomCard } = useGetRandomCard()
  const [imageLoaded, setImageLoaded] = useState(false)

  const loadNewCard = () => {
    setImageLoaded(false)
    fetchRandomCard()
  }

  return (
    <div className='grid grid-flow-row-dense grid-cols-3 mb-6'>
      <div>
        <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-2'>Random TGC Card</h2>
        {!loading && <Button onClick={loadNewCard}>Find New Card</Button>}
      </div>
      <div className='col-span-2'>
        <div className='flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 '>
          {imageLoaded ? null : (
            <div role='status' className='animate-pulse w-[245px] h-[342px]'>
              <div className='flex justify-center items-center w-full h-full bg-gray-300 rounded dark:bg-gray-700' />
              <span className='sr-only'>Loading...</span>
            </div>
          )}
          <img
            style={imageLoaded ? {} : { display: 'none' }}
            src={randomCard?.images.small}
            alt={randomCard?.name}
            onLoad={() => setImageLoaded(true)}
          />

          <div className='flex flex-col justify-between p-8 leading-normal'>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              {randomCard?.name && `${randomCard.name} (${randomCard.rarity})`}
            </h5>
            <p>{randomCard?.subtypes.join(', ')}</p>
            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
              {randomCard?.flavorText}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
