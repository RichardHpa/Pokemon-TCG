import { useEffect, useState } from 'react'

import { Paragraph } from 'components/Paragraph'
import { Heading } from 'components/Heading'

import type { PokemonCardInfoProps } from './types'

export const PokemonCardInfo = ({ card, loading }: PokemonCardInfoProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    if (!card) {
      setImageLoaded(false)
    }
  }, [card])

  const loadImage = () => {
    setTimeout(() => {
      setImageLoaded(true)
    }, 500)
  }

  const imageLoading = loading || !imageLoaded
  return (
    <div className='flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 '>
      {imageLoading && (
        <div
          role='status'
          className='animate-pulse min-w-[245px] h-[342px]'
          aria-label='loading card image'
        >
          <div className='flex justify-center items-center w-full h-full bg-gray-300 rounded dark:bg-gray-700' />
          <span className='sr-only'>Loading...</span>
        </div>
      )}
      <img
        style={imageLoaded ? {} : { display: 'none' }}
        src={card?.images.small}
        alt={card?.name}
        onLoad={loadImage}
      />

      <div className='flex flex-col justify-between p-8 leading-normal'>
        <Heading level='4'>{card?.name && `${card?.name} (${card?.rarity})`}</Heading>
        <p>{card?.subtypes.join(', ')}</p>
        <Paragraph>{card?.flavorText}</Paragraph>
      </div>
    </div>
  )
}
