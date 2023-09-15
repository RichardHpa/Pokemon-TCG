import { useParams } from 'react-router-dom'

import { BreadcrumbHeader } from 'components/BreadcrumbHeader'
import { LoadingPokeBall } from 'components/LoadingPokeBall'
import { Button } from 'components/Button'
import { SingleCardThumbnail } from 'components/SingleCardThumbnail'

import { useGetSet } from 'hooks/useGetSet'
import { useGetCards } from 'hooks/useGetCards'

import { invariant } from 'utils/invariant'

import type { Card as CardProps } from 'types/fixtures/card'

export const Set = () => {
  const { setId } = useParams()
  invariant(setId)
  const { set, loading, error } = useGetSet(setId)

  const {
    cards,
    loading: cardsLoading,
    hasMore,
    fetchMoreCards,
    isFetching,
  } = useGetCards({
    query: `set.id:"${setId}"`,
    pageSize: 30,
    orderBy: 'number',
  })

  if (!set || error) {
    return <>{error}</>
  }

  return (
    <div>
      <BreadcrumbHeader
        title={set?.name}
        breadcrumbs={[
          {
            label: 'Sets',
            path: '/sets',
          },
          {
            label: set?.name,
          },
        ]}
      />

      {loading || cardsLoading ? (
        <div className='flex justify-center'>
          <LoadingPokeBall size='100' loading={true} />
        </div>
      ) : (
        <>
          <div>
            <p>{set?.releaseDate}</p>
          </div>

          {cards && (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 my-4'>
              {cards.map((card: CardProps) => {
                return <SingleCardThumbnail key={card.id} card={card} />
              })}
            </div>
          )}

          {hasMore && (
            <div className='mt-4 flex justify-center'>
              <Button onClick={fetchMoreCards} disabled={isFetching}>
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
