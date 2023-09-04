import { useGetRandomCard } from 'hooks/useGetRandomCard'
import { Button } from 'components/Button'
import { PokemonCardInfo } from 'components/PokemonCardInfo'
import { Heading } from 'components/Heading'

export const RandomCard = () => {
  const { data: randomCard, loading, fetchRandomCard } = useGetRandomCard()

  const loadNewCard = () => {
    fetchRandomCard()
  }

  return (
    <div className='grid grid-flow-row-dense grid-cols-3 mb-6'>
      <div>
        <Heading level='3'>Random TGC Card</Heading>
        {!loading && <Button onClick={loadNewCard}>Find New Card</Button>}
      </div>
      <div className='col-span-2'>
        <PokemonCardInfo loading={loading} card={randomCard} />
      </div>
    </div>
  )
}
