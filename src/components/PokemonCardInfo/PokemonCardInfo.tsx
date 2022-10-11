import { useState } from 'react'

import type { PokemonCardInfoProps } from './types'

export const PokemonCardInfo = ({ card }: PokemonCardInfoProps) => {
  const { name, images, rarity, subtypes, flavorText } = card
  const [imageLoaded, setImageLoaded] = useState(false)

  const loadImage = () => {
    setTimeout(() => {
      setImageLoaded(true)
    }, 500)
  }

  return (
    <div className='flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 '>
      {imageLoaded ? null : (
        <div role='status' className='animate-pulse w-[245px] h-[342px]'>
          <div className='flex justify-center items-center w-full h-full bg-gray-300 rounded dark:bg-gray-700' />
          <span className='sr-only'>Loading...</span>
        </div>
      )}
      <img
        style={imageLoaded ? {} : { display: 'none' }}
        src={images.small}
        alt={name}
        onLoad={loadImage}
      />

      <div className='flex flex-col justify-between p-8 leading-normal'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {name && `${name} (${rarity})`}
        </h5>
        <p>{subtypes.join(', ')}</p>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{flavorText}</p>
      </div>
    </div>
  )
}
