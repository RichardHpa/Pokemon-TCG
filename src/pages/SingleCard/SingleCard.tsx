import { useParams } from 'react-router-dom'

import { BreadcrumbHeader } from 'components/BreadcrumbHeader'
import { LoadingPokeBall } from 'components/LoadingPokeBall'

import { Paragraph } from 'components/Paragraph'
import { Heading } from 'components/Heading'

import { StockFinder } from './components/StockFinder'

import { Card } from 'components/Card'

import { useGetCard } from 'hooks/useGetCard'

export const SingleCard = () => {
  const { cardId } = useParams()
  const { card, loading } = useGetCard(cardId)

  if (loading) {
    return (
      <div className='flex justify-center'>
        <LoadingPokeBall size='100' loading={true} />
      </div>
    )
  }

  if (!card) {
    return <>error</>
  }

  return (
    <div>
      <BreadcrumbHeader
        title={card?.name}
        breadcrumbs={[
          {
            label: 'Sets',
            path: '/sets',
          },
          {
            label: card.set.name,
            path: `/sets/${card.set.id}`,
          },
          {
            label: card?.id,
          },
        ]}
      />

      <div className='grid grid-flow-row-dense grid-cols-3 mb-6 gap-4'>
        <div>
          <img src={card?.images.large} alt={card?.name} />
        </div>
        <div className='col-span-2'>
          <div className='mb-4'>
            <Card full={false}>
              <Heading level='2'>{card.name}</Heading>
              <Paragraph>{card?.flavorText}</Paragraph>
            </Card>
          </div>
          <StockFinder card={card} />
        </div>
      </div>
    </div>
  )
}
