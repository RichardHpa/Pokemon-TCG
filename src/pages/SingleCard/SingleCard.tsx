import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { BreadcrumbHeader } from 'components/BreadcrumbHeader'
import { LoadingPokeBall } from 'components/LoadingPokeBall'
import { Paragraph } from 'components/Paragraph'
import { Heading } from 'components/Heading'
import { Card } from 'components/Card'
import { Table } from 'components/Table'

import { StockFinder } from './components/StockFinder'

import { useGetCard } from 'hooks/useGetCard'

import { invariant } from 'utils/invariant'

const tableColumns = [
  {
    label: 'Variant',
    key: 'variant',
  },
  {
    label: 'Market Price',
    key: 'marketPrice',
  },
  {
    label: 'Range',
    key: 'range',
  },
]

interface CardPriceDataProps {
  key: string
  variant: string
  marketPrice: string
  range: string
}

export const SingleCard = () => {
  const { cardId } = useParams()
  invariant(cardId)
  const { card, loading, error } = useGetCard(cardId)

  const tableData = useMemo<CardPriceDataProps[]>(() => {
    if (!card) return []
    const tcgVariants = Object.keys(card.tcgplayer.prices)
    return tcgVariants.map((variant, i) => {
      return {
        key: `${variant}-${i}`,
        variant: variant,
        marketPrice: `$${card.tcgplayer.prices[variant].market} USD`,
        range: `$${card.tcgplayer.prices[variant].low} - $${card.tcgplayer.prices[variant].high} USD`,
      }
    })
  }, [card])

  if (loading) {
    return (
      <div className='flex justify-center'>
        <LoadingPokeBall size='100' loading={true} />
      </div>
    )
  }

  if (!card || error) {
    return <>{error}</>
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
              <Paragraph>Artist: {card.artist}</Paragraph>
              <Paragraph>
                Card Type: {card.supertype}&nbsp; (
                {card.subtypes && card.subtypes.length >= 0 && (
                  <span>
                    {card.subtypes.map((subtype, i) => {
                      if (i < card.subtypes.length - 1) {
                        return <span key={subtype}>{subtype}; </span>
                      } else {
                        return <span key={subtype}>{subtype}</span>
                      }
                    })}
                  </span>
                )}
                )
              </Paragraph>

              {card.abilities && card.abilities.length >= 0 && (
                <div>
                  <Paragraph>Abilities: </Paragraph>
                  {card.abilities.map((ability) => {
                    return (
                      <div key={ability.name}>
                        {ability.name}
                        <br /> {ability.text}
                      </div>
                    )
                  })}
                </div>
              )}

              <br />

              <Table columns={tableColumns} data={tableData} />
            </Card>
          </div>
          <StockFinder card={card} />
        </div>
      </div>
    </div>
  )
}
