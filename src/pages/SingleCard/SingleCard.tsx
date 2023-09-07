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

  const tcgVariants = Object.keys(card.tcgplayer.prices);

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
                Card Type: {card.supertype}&nbsp; 
                (
                  {card.subtypes && card.subtypes.length >= 0 && (
                    <span>
                      {card.subtypes.map((subtype,i) => {
                        if(i < card.subtypes.length - 1){
                          return(
                            <span key={subtype}>{subtype}; </span>
                          )
                        } else {
                          return(
                            <span key={subtype}>{subtype}</span>
                          )
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
                        return(
                          <div key={ability.name}> {ability.name} ({ability.type}) - {ability.text} </div>
                        )
                      }
                      )}
                    </div>
                  )                    
              }

              <br />
              <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" className="px-6 py-3">
                                  Variant
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Market Price
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Range
                              </th>

                          </tr>
                      </thead>
                      <tbody>
                        {tcgVariants.map((variant) => {
                          return(
                            <tr key={variant} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <td className="px-6 py-4">{variant}</td>
                              <td className="px-6 py-4">${card.tcgplayer.prices[variant].market} USD</td>
                              <td className="px-6 py-4">${card.tcgplayer.prices[variant].low} - ${card.tcgplayer.prices[variant].high} USD</td>
                              
                            </tr>
                          )
                          }
                        )}
                      </tbody>
                  </table>
              </div>

            </Card>
          </div>
          <StockFinder card={card} />
        </div>
      </div>
    </div>
  )
}
