import { useGetRandomCard } from 'hooks/useGetRandomCard'
import { Button } from 'components/Button'
import { PokemonCardInfo } from 'components/PokemonCardInfo'

export const RandomCard = () => {
  const { data: randomCard, loading, fetchRandomCard } = useGetRandomCard()

  const loadNewCard = () => {
    fetchRandomCard()
  }

  return (
    <div className='grid grid-flow-row-dense grid-cols-3 mb-6'>
      <div>
        <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-2'>Random TGC Card</h2>
        {!loading && <Button onClick={loadNewCard}>Find New Card</Button>}
      </div>
      <div className='col-span-2'>
        <PokemonCardInfo loading={loading} card={randomCard} />
      </div>
    </div>
  )
}
